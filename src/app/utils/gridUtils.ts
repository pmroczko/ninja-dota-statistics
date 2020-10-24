export class GridUtils {

    public static GetColumnsFull(mode: string): Array<any> {
        let columns: Array<any> = [];
        let columnsToAdd: Array<number> = [];
        if (mode == "any") {
            this.AddFullPlayerColumn(columns, 1);
            this.AddFullPlayerColumn(columns, 2);
            this.AddFullPlayerColumn(columns, 3);
            this.AddFullPlayerColumn(columns, 4);
            this.AddFullPlayerColumn(columns, 5);
        } else
            switch (mode) {
                case "any":
                case "5":
                    columnsToAdd.push(5);
                case "4":
                    columnsToAdd.push(4);
                case "3":
                    columnsToAdd.push(3);
                case "2":
                    columnsToAdd.push(2);
                case "1":
                    columnsToAdd.push(1);
                    break;
                default:
                    throw new Error(`Unknown mode ${mode}`);
                    break;
            }
        columnsToAdd.sort((c1, c2) => (c1 > c2 ? 1 : -1));
        columnsToAdd.forEach(c => this.AddFullPlayerColumn(columns, c));
        this.AddOtherFullColumns(columns);
        return columns;
    }

    private static AddFullPlayerColumn(columns: Array<any>, playerNo: number) {
        columns.push({
            headerName: "Player" + playerNo,
            field: "Player" + playerNo,
            type: "text"
        })
    }
    public static AddOtherFullColumns(columns: Array<any>) {
        columns.push({
            headerName: "Wins",
            field: "Wins",
            sortable: true
        })
        columns.push(
            {
                headerName: "Looses",
                field: "Looses",
                sortable: true
            })
        columns.push(
            {
                headerName: "WinLooseRatio",
                field: "WinLooseRatio",
                sortable: true
            })
    }
}