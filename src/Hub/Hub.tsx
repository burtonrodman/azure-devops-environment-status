import "./Hub.scss";

import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";

import { Header, TitleSize } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
import { ISimpleTableCell, ITableColumn, renderSimpleCell, renderSimpleCellValue, Table, TableColumnLayout } from "azure-devops-ui/Table";
import { getClient } from "azure-devops-extension-api";
import { CoreRestClient, ProjectVisibility, TeamProjectReference } from "azure-devops-extension-api/Core";
import { ISimpleListCell } from "azure-devops-ui/List";
import { IStatusProps, Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { css } from "azure-devops-ui/Util";

import { showRootComponent } from "../common";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { ObservableValue } from "azure-devops-ui/Core/Observable";

export interface ITableItem extends ISimpleTableCell {
    name: ISimpleListCell;
    age: number;
    gender: string;
}

export const renderStatus = (className?: string) => {
    return (
        <Status
            {...Statuses.Success}
            ariaLabel="Success"
            className={css(className, "bolt-table-status-icon")}
            size={StatusSize.s}
        />
    );
};

interface IHubContentState {
    headerDescription?: string;
    useLargeTitle?: boolean;
    useCompactPivots?: boolean;
    columns: ITableColumn<any>[];
    people?: ITableItem[];
}

class HubContent extends React.Component<{}, IHubContentState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            columns: [
                {
                    columnLayout: TableColumnLayout.singleLinePrefix,
                    id: "name",
                    name: "Name",
                    readonly: true,
                    renderCell: renderSimpleCell,
                    width: new ObservableValue(-30),
                },
                {
                    id: "age",
                    name: "Age",
                    readonly: true,
                    renderCell: renderSimpleCell,
                    width: new ObservableValue(-30),
                },
                {
                    columnLayout: TableColumnLayout.none,
                    id: "gender",
                    name: "Gender",
                    readonly: true,
                    renderCell: renderSimpleCell,
                    width: new ObservableValue(-40),
                },
            ],
            people: [
                {
                    age: 50,
                    gender: "M",
                    name: { iconProps: { render: renderStatus }, text: "Rory Boisvert" },
                },
                {
                    age: 49,
                    gender: "F",
                    name: { iconProps: { iconName: "Home", ariaLabel: "Home" }, text: "Sharon Monroe" },
                },
                {
                    age: 18,
                    gender: "F",
                    name: { iconProps: { iconName: "Home", ariaLabel: "Home" }, text: "Lucy Booth" },
                },
            ]
        };
    }

    public componentDidMount() {
        SDK.init();
        // this.initializeComponent();
    }

    // private async initializeComponent() {
    //     const projects = await getClient(CoreRestClient).getProjects();
    //     this.setState({
    //         people: new ArrayItemProvider(projects)
    //     });
    // }

    public render(): JSX.Element {

        const { headerDescription, useLargeTitle, columns, people } = this.state;
        const tableItemsNoIcons = new ArrayItemProvider<ITableItem>(
            people!.map((item: ITableItem) => {
                const newItem = Object.assign({}, item);
                newItem.name = { text: newItem.name.text };
                return newItem;
            })
        );

        return (
            <Page className="environment-status-hub flex-grow">

                <Header title="Environments Status"
                    description={headerDescription}
                    titleSize={useLargeTitle ? TitleSize.Large : TitleSize.Medium} />

                <Card className="flex-grow bolt-table-card" contentProps={{ contentPadding: false }}>
                    <Table
                        ariaLabel="Environments"
                        columns={columns}
                        itemProvider={tableItemsNoIcons}
                        role="table"
                        className="projects-table"
                        containerClassName="h-scroll-auto"
                    />
                </Card>
            </Page>
        );
    }
}

showRootComponent(<HubContent />);