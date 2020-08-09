import language from '@google-cloud/language'
import { LanguageServiceClient } from '@google-cloud/language/build/src/v1/language_service_client'
import { google } from '@google-cloud/language/build/protos/protos'
import * as dotenv from 'dotenv'
dotenv.config()

export default class NaturalLanguage {
  public client: LanguageServiceClient
  constructor() {
    this.client = new language.LanguageServiceClient()
  }

  public async analyzeSentimentContent(
    content: string,
    type: google.cloud.language.v1.Document.Type
  ): Promise<google.cloud.language.v1.ISentence[] | null | undefined> {
    const document = {
      content,
      type,
    } as google.cloud.language.v1.IDocument

    const [result] = await this.client.analyzeSentiment({ document })

    return result.sentences
  }

  public async analyzeEntityContent(
    content: string,
    type: google.cloud.language.v1.Document.Type
  ): Promise<google.cloud.language.v1.IEntity[] | null | undefined> {
    const document = {
      content,
      type,
    }
    const [result] = await this.client.analyzeEntities({ document })

    return result.entities
  }

  /**
   * 1000文字区切りにテキストを分割する。
   * 料金削減のため
   * @param contents
   */
  public shapeContent(contents: string[]): string[] {
    const tmpContents: string[] = []
    let content = '',
      tmpContent = ''

    for (let i = 0; i < contents.length; i++) {
      content += contents[i]

      if (content.length > 1000) {
        tmpContents.push(tmpContent)
        tmpContent = ''
        content = ''
      } else {
        tmpContent += contents[i]
      }
    }

    return tmpContents
  }
}
