export function CharacterLimit(text: string | null | undefined, maxLength: number) {
    if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
}