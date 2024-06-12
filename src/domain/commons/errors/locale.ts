import { isEmpty } from "lodash"

type LocaleTemplate = {
    replaceTemplate: string
    replaceBy: Locale
}

type LocaleSchema = {
    en: string,
    th: string
}

export enum Lang {
    EN = 'en',
    TH = 'th'
}

class LocaleBuilder {
    private _enValue: string
    private _thValue: string
    private _localTemplates: LocaleTemplate[] = []

    public en(value: string): LocaleBuilder {
        this._enValue = value

        return this
    }

    public th(value: string): LocaleBuilder {
        this._thValue = value

        return this
    }

    private _replaceInTemplate(source: string, templates: LocaleTemplate[], lang: Lang) {
        const replace = (src: string, template: LocaleTemplate, lang: Lang) => {
            return src.replace(new RegExp(template.replaceTemplate, 'g'), template.replaceBy.getLang(lang))
        }

        return templates.reduce((result: string, template: LocaleTemplate) => replace(result, template, lang), source)
    }

    private _defaultEnIfEmpty(value: string) {
        return isEmpty(value) ? this._enValue : value
    }

    public build() {
        return new Locale(
            this._replaceInTemplate(this._enValue, this._localTemplates, Lang.EN),
            this._replaceInTemplate(this._defaultEnIfEmpty(this._thValue), this._localTemplates, Lang.TH)
        )
    }
}

export class Locale {
    public static en(value: string): LocaleBuilder {
        return new LocaleBuilder().en(value)
    }

    constructor(private _enValue: string, private _thValue: string) {}

    public getSchema(): LocaleSchema {
        return {
            en: this._enValue,
            th: this._thValue
        }
    }

    public concat(locale: Locale, concatBy: string = ', '): Locale {
        this._enValue = [this._enValue, locale._enValue].join(concatBy)
        this._thValue = [this._thValue, locale._thValue].join(concatBy)

        return this
    }

    public getLang(lang: Lang) {
        switch(lang) {
            case Lang.EN:
                return this._enValue
            case Lang.TH:
                return this._thValue
            default:
                return ''
        }
    }
}