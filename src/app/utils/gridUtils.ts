export class GridUtils {

    public static GetRoleColDef(): any {
        return {
            flex: 1,
            minWidth: 110,
            editable: true,
            resizable: true,
        };
    }

    public static GetRoleSynergyColumns(): Array<any> {
        let columns: Array<any> = [];
        this.AddRolePlayerColumn(columns, 1);
        this.AddRolePlayerColumn(columns, 2);
        columns.push(
            {
                headerName: "Win Factor",
                field: "WinFactor",
                sortable: true
            })
        return columns;
    }
    public static GetRoleWrColumns(mode: string): Array<any> {
        let columns: Array<any> = [];
        let columnsToAdd: Array<number> = [];
        if (mode == "any") {
            this.AddRolePlayerColumn(columns, 1);
            this.AddRolePlayerColumn(columns, 2);
            this.AddRolePlayerColumn(columns, 3);
            this.AddRolePlayerColumn(columns, 4);
            this.AddRolePlayerColumn(columns, 5);
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
        columnsToAdd.forEach(c => this.AddRolePlayerColumn(columns, c));
        this.AddOtherRoleColumns(columns);
        return columns;
    }

    private static AddRolePlayerColumn(columns: Array<any>, playerNo: number) {
        columns.push({
            headerName: "Player" + playerNo,
            field: "Player" + playerNo,
            type: "text",
            filter: 'agTextColumnFilter'
        })
    }
    public static AddOtherRoleColumns(columns: Array<any>) {
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
                headerName: "Win Ratio",
                field: "WinRatio",
                sortable: true
            })
    }
}