export function pluralizeRecipes(count: number) {
    const lastTwo = count % 100;
    const lastOne = count % 10;

    if (lastTwo >= 11 && lastTwo <= 19) {
        return `${count} новых рецептов`;
    }

    if (lastOne === 1) {
        return `${count} новый рецепт`;
    }

    if (lastOne >= 2 && lastOne <= 4) {
        return `${count} новых рецепта`;
    }

    return `${count} новых рецептов`;
}
export function pluralizeRecomendationRecipes(count: number) {
    const lastTwo = count % 100;
    const lastOne = count % 10;

    if (lastTwo >= 11 && lastTwo <= 19) {
        return `${count} рекомендованных рецептов`;
    }

    if (lastOne === 1) {
        return `${count} рекомендованный рецепт`;
    }

    if (lastOne >= 2 && lastOne <= 4) {
        return `${count} рекомендованных рецепта`;
    }

    return `${count} рекомендованных рецептов`;
}
