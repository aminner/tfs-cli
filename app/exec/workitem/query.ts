import { EOL as eol } from "os";
import { TfCommand } from "../../lib/tfcommand";
import _ = require("lodash");
import args = require("../../lib/arguments");
import coreContracts = require("vso-node-api/interfaces/CoreInterfaces");
import trace = require("../../lib/trace");
import witBase = require("./default");
import witClient = require("vso-node-api/WorkItemTrackingApi");
import witContracts = require("vso-node-api/interfaces/WorkItemTrackingInterfaces");

export function getCommand(args: string[]): WorkItemQuery {
	return new WorkItemQuery(args);
}

export class WorkItemQuery extends witBase.WorkItemBase<witContracts.WorkItem[]> {
	protected description = "Get a list of Work Items given a query";

	protected getHelpArgs(): string[] {
		return ["project", "query"];
	}

	public exec(): Promise<witContracts.WorkItem[]> {
		var witApi: witClient.IWorkItemTrackingApi = this.webApi.getWorkItemTrackingApi();

		return this.commandArgs.project.val(true).then((projectName) => {
			return this.commandArgs.query.val().then((query) => {
				let wiql: witContracts.Wiql = { query: query };
				if(wiql.query.toLowerCase().includes("workitemlinks"))
				{
					return witApi.queryByWiql(wiql, <coreContracts.TeamContext>{ project: projectName }).then((result) => {
						let workItemIds = result.workItemRelations.map(val => val.target.id).slice(0, Math.min(200, result.workItemRelations.length));
						let fieldRefs = result.columns.map(val => val.referenceName)
						
						fieldRefs = fieldRefs.slice(0, Math.min(20, result.columns.length));
						return witApi.getWorkItems(workItemIds, fieldRefs);
					});
				} else {
					return witApi.queryByWiql(wiql, <coreContracts.TeamContext>{ project: projectName }).then((result) => {
						let workItemIds = result.workItems.map(val => val.id).slice(0, Math.min(200, result.workItems.length));
						let fieldRefs = result.columns.map(val => val.referenceName)
						
						fieldRefs = fieldRefs.slice(0, Math.min(20, result.columns.length));
						return witApi.getWorkItems(workItemIds, fieldRefs);
					});
				}
			});
		});

	}

	public friendlyOutput(data: witContracts.WorkItem[]): void {
		return witBase.friendlyOutput(data);
	}
}