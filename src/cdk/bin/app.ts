#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { RemovalPolicy } from "aws-cdk-lib";
import "source-map-support/register";
import { RootStack, RootStackProps } from "../lib/root-stack";
import * as dotenv from "dotenv";

// load environment variables if .env file is present
dotenv.config();

const app = new cdk.App();

const stackName = `${process.env.CDK_APP_NAME ?? ""}-${
  process.env.CDK_ENVIRONMENT ?? ""
}-${process.env.CDK_ENVIRONMENT_COLOR ?? ""}`;

const rootStackProps: RootStackProps = {
  environment: process.env.CDK_ENVIRONMENT ?? "",
  color: process.env.CDK_ENVIRONMENT_COLOR ?? "",
  cloudFrontDomainCertificateArn:
    process.env.CDK_CLOUD_FRONT_DOMAIN_CERTIFICATE_ARN ?? "",
  appName: process.env.CDK_APP_NAME ?? "",
  domain: process.env.CDK_DOMAIN ?? "",
  hostedZoneId: process.env.CDK_HOSTED_ZONE_ID ?? "",
  region: process.env.CDK_REGION ?? "",
  removalPolicy:
    process.env.CDK_REMOVAL_POLICY === "DESTROY"
      ? RemovalPolicy.DESTROY
      : RemovalPolicy.RETAIN,
  bucketName: stackName,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

new RootStack(app, stackName, rootStackProps);
