#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/app-stack';
import { RootStackProps } from '../lib/root-stack';
import { RemovalPolicy } from 'aws-cdk-lib';

const app = new cdk.App();

const environment = process.env.DEPLOYMENT_ENVIRONMENT; // e.g. dev, test, prod
if (!environment) throw new Error('env variable environment missing');
const color = process.env.DEPLOYMENT_COLOR ?? ''; // e.g. blue, green, banana
if (!color) throw new Error('env variable color missing');
const removalPolicy =
  process.env.REMOVAL_POLICY === 'DESTROY'
    ? RemovalPolicy.DESTROY
    : RemovalPolicy.RETAIN; // e.g. blue, green, banana

const appName = 'gazzdev';
const domain = 'gazz.dev';
const stackName = `${appName}-${environment}-${color}`;
// const allowedOrigins = [
//   `https://${domain}`,
//   `https://${environment}.${color}.${domain}`,
// ];

const rootStackProps: RootStackProps = {
  environment: environment,
  cloudFrontDomainCertificateArn:
    'arn:aws:acm:us-east-1:781724965319:certificate/e0942a19-b9a2-4291-bfca-561bfbad4588',
  apiDefaultMemoryAllocation: 256,
  apiTimeout: 30,
  appName: appName,
  domain: domain,
  hostedZoneId: 'Z06298681SMOJFMM8BITC',
  region: 'eu-west-2',
  stackName: stackName,
  // cors: {
  //   allowHeaders: ['*'],
  //   allowOrigins: allowedOrigins,
  //   allowedMethods: [CorsHttpMethod.ANY],
  // },
  removalPolicy: removalPolicy,
};

new AppStack(
  app,
  'GazzdevStack',
  rootStackProps

  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
);
