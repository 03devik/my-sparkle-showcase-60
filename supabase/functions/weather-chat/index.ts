import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, weatherData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received chat request with weather data:", weatherData?.city || "no weather");
    console.log("Number of messages:", messages?.length || 0);

    const systemPrompt = `You are a friendly and helpful AI weather assistant. Your role is to help users understand weather conditions, provide insights, and give practical advice based on weather data.

${weatherData ? `Current weather data:
- City: ${weatherData.city}, ${weatherData.country}
- Temperature: ${weatherData.temp}°C (feels like ${weatherData.feels_like}°C)
- Conditions: ${weatherData.description}
- Humidity: ${weatherData.humidity}%
- Wind Speed: ${weatherData.wind_speed} m/s
- Pressure: ${weatherData.pressure} hPa
- UV Index: ${weatherData.uv_index}
- Sunrise: ${weatherData.sunrise}
- Sunset: ${weatherData.sunset}` : "No weather data is currently loaded. Suggest the user search for a city first."}

Guidelines:
- Be conversational and friendly
- Provide practical advice (what to wear, outdoor activities, etc.)
- Explain weather phenomena in simple terms
- If asked about forecasts beyond current data, explain you only have current conditions
- Keep responses concise but helpful (2-3 sentences for simple questions)
- Use weather emojis occasionally to make responses engaging ☀️🌧️❄️💨`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Weather chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
