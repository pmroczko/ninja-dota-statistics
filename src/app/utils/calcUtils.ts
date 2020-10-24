export class CalcUtils {
    public static CalcWinRatio(wins: number, looses: number): string {
        let ratio = wins / (wins + looses);
        ratio = Math.round(100 * ratio);
        return `${ratio}%`;
    }
}