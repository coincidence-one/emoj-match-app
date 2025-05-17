export async function POST(req: Request) {
  const { text } = await req.json();

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `다음 문장을 이모지 시퀀스로 변환해줘. 예시는 다음과 같아:

입력: "난 지금 공원에 달리기를 하러 갈거야"
출력: 🙎‍♂️🏃‍♂️🌳⌚️

입력 문장: "${text}"
출력 (이모지들만 보여줘):`,
        },
      ],
      temperature: 0.5,
    }),
  });

  const result = await openaiRes.json();
  const emoji = result.choices?.[0]?.message?.content?.trim() || '🤔';
console.log("openai 응답:", result)
  return Response.json({ emoji });
}