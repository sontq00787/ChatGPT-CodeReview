import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
    });
  }

  private generatePrompt = (patch: string) => {
    return `You are a senior software engineer with more than 15 years of experience. Bellow is the code patch, please help me do a code review, and tell me if any securities risk and improvement, optimize suggestion
    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);
    const lang = process.env.LANGUAGE;

    const res = await this.chatAPI.sendMessage(prompt, {
      promptPrefix: 'hi,',
      promptSuffix: `\nlet's start` + (lang ? ', Answer me in ${lang}' : ''),
    });

    console.timeEnd('code-review cost');
    return res.text;
  };
}
