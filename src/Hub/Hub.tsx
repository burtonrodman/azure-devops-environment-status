import "./Hub.scss";

import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";

import { Header, TitleSize } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { Card } from "azure-devops-ui/Card";
import { ISimpleTableCell, ITableColumn, renderSimpleCell, renderSimpleCellValue, Table, TableColumnLayout } from "azure-devops-ui/Table";
import { getClient } from "azure-devops-extension-api";
import { CoreRestClient, ProjectVisibility, TeamProjectReference } from "azure-devops-extension-api/Core";
import { EnvironmentInstance, TaskAgentRestClient } from "azure-devops-extension-api/TaskAgent";
import { ISimpleListCell } from "azure-devops-ui/List";
import { IStatusProps, Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { css } from "azure-devops-ui/Util";

import { showRootComponent } from "../common";
import { ArrayItemProvider } from "azure-devops-ui/Utilities/Provider";
import { ObservableValue } from "azure-devops-ui/Core/Observable";

import { CommonServiceIds, IProjectPageService } from "azure-devops-extension-api";

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
    environments?: EnvironmentInstance[];
}

class HubContent extends React.Component<{}, IHubContentState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            columns: [
                {
                    id: "name",
                    name: "Environment",
                    renderCell: renderSimpleCell,
                    width: -25
                },
                {
                    id: "description",
                    name: "Description",
                    renderCell: renderSimpleCell,
                    width: -75
                }
            ],
        };
    }

    public componentDidMount() {
        SDK.init();
        this.initializeComponent();
    }

    private async initializeComponent() {
        
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();
        console.log(project);
        
        const client = getClient(TaskAgentRestClient);
        const environments = await client.getEnvironments(project!.id)

        this.setState({
            environments: environments
        });

    }

    public render(): JSX.Element {

        const { headerDescription, useLargeTitle, columns, environments } = this.state;
        let tableItemsNoIcons = environments ? new ArrayItemProvider<EnvironmentInstance>(
            environments!.map((item: EnvironmentInstance) => {
                const newItem = Object.assign({}, item);
                // newItem.name = { text: newItem.name };
                return newItem;
            })
        ) : null;

        return (
            <Page className="environment-status-hub flex-grow">

                <Header title="Environments Status"
                    description={headerDescription}
                    titleSize={useLargeTitle ? TitleSize.Large : TitleSize.Medium} />

                <Card className="flex-grow bolt-table-card bolt-card-with-header bolt-card flex-column depth-8 bolt-card-white"
                    contentProps={{ contentPadding: false }}>
                    {
                        tableItemsNoIcons &&
                        <Table
                            ariaLabel="Environments"
                            columns={columns}
                            itemProvider={tableItemsNoIcons}
                            role="table"
                            className="projects-table"
                            containerClassName="h-scroll-auto"
                        />
                    }
                </Card>

            </Page>
        );
    }
}

showRootComponent(<HubContent />);