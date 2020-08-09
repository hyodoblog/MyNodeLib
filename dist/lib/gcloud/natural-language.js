"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("@google-cloud/language");
const dotenv = require("dotenv");
dotenv.config();
class NaturalLanguage {
    constructor() {
        this.client = new language_1.default.LanguageServiceClient();
    }
    async analyzeSentimentContent(content, type) {
        const document = {
            content,
            type,
        };
        const [result] = await this.client.analyzeSentiment({ document });
        return result.sentences;
    }
    async analyzeEntityContent(content, type) {
        const document = {
            content,
            type,
        };
        const [result] = await this.client.analyzeEntities({ document });
        return result.entities;
    }
    /**
     * 1000文字区切りにテキストを分割する。
     * 料金削減のため
     * @param contents
     */
    shapeContent(contents) {
        const tmpContents = [];
        let content = '', tmpContent = '';
        for (let i = 0; i < contents.length; i++) {
            content += contents[i];
            if (content.length > 1000) {
                tmpContents.push(tmpContent);
                tmpContent = '';
                content = '';
            }
            else {
                tmpContent += contents[i];
            }
        }
        return tmpContents;
    }
}
exports.default = NaturalLanguage;
//# sourceMappingURL=natural-language.js.map