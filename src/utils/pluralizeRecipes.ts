import pluralize from 'pluralize-ru';

export function declinePhrase(count: number, nounForms: string[], adjectiveForms?: string[]) {
    if (adjectiveForms) {
        return pluralize(
            count,
            `%d ${adjectiveForms[0]} ${nounForms[0]}`,
            `%d ${adjectiveForms[1]} ${nounForms[1]}`,
            `%d ${adjectiveForms[2]} ${nounForms[2]}`,
            `%d ${adjectiveForms[3]} ${nounForms[3]}`,
        );
    } else {
        return pluralize(
            count,
            `%d ${nounForms[0]}`,
            `%d ${nounForms[1]}`,
            `%d ${nounForms[2]}`,
            `%d ${nounForms[3]}`,
        );
    }
}

const PLURALIZE = {
    RECIPE: ['рецептов', 'рецепт', 'рецепта', 'рецептов'],
    NEW: ['новых', 'новый', 'новых', 'новых'],
    RECOMMEND: ['рекомендованных', 'рекомендованный', 'рекомендованных', 'рекомендованных'],
    SUBCRIBE: ['подписчиков', 'подписчик', 'подписчика', 'подписчиков'],
    BOOKMARK: ['сохранений', 'сохранение', 'сохранений', 'сохранений'],
    LIKE: ['лайков', 'лайк', 'лайка', 'лайков'],
};

export function pluralizeRecipes(count: number) {
    return declinePhrase(count ?? 0, PLURALIZE.RECIPE, PLURALIZE.NEW);
}

export function pluralizeRecomendationRecipes(count: number) {
    return declinePhrase(count ?? 0, PLURALIZE.RECIPE, PLURALIZE.RECOMMEND);
}

export function pluralizeSubscribes(count: number | undefined) {
    return declinePhrase(count ?? 0, PLURALIZE.SUBCRIBE);
}
export function pluralizeBookmark(count: number) {
    return declinePhrase(count ?? 0, PLURALIZE.BOOKMARK);
}
export function pluralizeLikes(count: number) {
    return declinePhrase(count ?? 0, PLURALIZE.LIKE);
}
