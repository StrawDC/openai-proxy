import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

const OPENAI_API_HOST = "api.openai.com";

serve(async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const readmeResponse = await fetch(new URL("./Readme.md", import.meta.url));
    const readmeText = await readmeResponse.text();

    // 返回编码为UTF-8的Readme.md内容
    return new Response(readmeText, {
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
      },
    });
  }

  url.host = OPENAI_API_HOST;
  return await fetch(url, request);
});
