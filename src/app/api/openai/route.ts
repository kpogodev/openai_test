import { Configuration, OpenAIApi } from 'openai'


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request, res: Response) {
  const body = await req.json()

    try {
      const gptResponse = await openai.createCompletion({
        model:'text-davinci-003',
        prompt: `${body.prompt}`,
        max_tokens: 2048,
        temperature: 0.9,
      })

      return  new Response(JSON.stringify({text: gptResponse.data.choices[0].text}), {
        status: 200,
      })
    } catch (error) {
      if(error) {
        return new Response(JSON.stringify(error), {
          status: 500,
        })
      }
    }

}