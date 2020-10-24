export class StringUtils {
    public static ParsePlayer(e): string {
        if (!e)
            return "";
        return `${e[0]} ${e[1]}`
    }
}