import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
    });
  }

  private generatePrompt = (patch: string) => {
    return `optimize this code, make it more clean, easy to read and ignore "public record" classes and if this code is ok:
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
