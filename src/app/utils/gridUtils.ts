import { AppConst } from '../appConst';

export class GridUtils {

    public static GetRoleColDef(): any {
        return {
            flex: 1,
            minWidth: 110,
            editable: true,
            resizable: true,
        };
    }

    public static GetRoleSynergyColumns(mode): Array<any> {
        let columns: Array<any> = [];
        this.UpdateModeColumns(columns, mode);
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
        this.UpdateModeColumns(columns, mode);
        this.AddOtherRoleColumns(columns);
        return columns;
    }

    public static GetHeroColDef(mode: string): Array<any> {
        let columns: Array<any> = [];
        columns.push({
            headerName: "Hero",
            field: "Hero",
            type: "text",
            filter: 'agTextColumnFilter',
            sortable: true
        })
        columns.push({
            headerName: "Player",
            field: "Player",
            type: "text",
            filter: 'agTextColumnFilter',
            sortable: true
        })
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
                sortable: true,
                comparator: GridUtils.PercentComparator
            })
        if (mode == AppConst.HERO_TYPE_REL || mode == AppConst.HERO_TYPE_TOP) {
            columns.push({
                headerName: 'Factor',
                field: "Factor",
                sortable: true
            })
        }
        return columns;
    }

    private static UpdateModeColumns(columns, mode): void {
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
    }

    public static FilterDataPerPlayer(inputData: Array<any>, mode: string): Array<any> {
        switch (mode) {
            case "any":
                return inputData;
            case "5":
                return inputData.filter(d => d.Player5 != "");
            case "4":
                return inputData.filter(d => d.Player5 == "" && d.Player4 != "");
            case "3":
                return inputData.filter(d => d.Player4 == "" && d.Player3 != "")
            case "2":
                return inputData.filter(d => d.Player3 == "" && d.Player2 != "")
            case "1":
                return inputData.filter(d => d.Player2 == "")
        }
        return inputData;
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
                sortable: true,
                comparator: GridUtils.PercentComparator
            })
    }

    public static PercentComparator(value1: string, value2: string) {
        let val1 = +(value1.substring(0, value1.length - 1));
        let val2 = +(value2.substring(0, value2.length - 1));
        if (val1 == val2)
            return 0;
        return val1 > val2 ? 1 : -1
    }
}