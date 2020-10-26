export class CalcUtils {
    public static CalcWinRatio(wins: number, looses: number): string {
        if ((wins + looses) == 0)
            return '0%';;
        let ratio = wins / (wins + looses);
        ratio = Math.round(100 * ratio);
        return `${ratio}%`;
    }
}