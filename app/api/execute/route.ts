import { streamText } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return new Response("Missing prompt", { status: 400 });
  }

  const result = streamText({
    model: "openai/gpt-5-mini",
    system:
      "You are an expert advisor. Follow the user's structured prompt exactly. Honor the ROLE, CONTEXT, OBJECTIVE, DELIVERABLES, CONSTRAINTS, and FORMAT sections precisely. If the CLARIFY FIRST section requests missing input but enough information is present to proceed with reasonable assumptions, state your assumptions briefly at the top, then deliver the full response. Be specific, concrete, and actionable. No filler. No disclaimers.",
    prompt,
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
