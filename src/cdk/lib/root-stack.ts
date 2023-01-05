import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppStack } from './app-stack';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface RootStackProps extends StackProps {
  environment: string;
  domain: string;
  hostedZoneId: string;
  region: string;
  cloudFrontDomainCertificateArn: string;
  apiDefaultMemoryAllocation: number;
  apiTimeout: number;
  appName: string;
  //   cors: {
  //     allowOrigins: string[];
  //     allowHeaders: string[] | undefined;
  //     allowedMethods: string[];
  //   };
  removalPolicy: RemovalPolicy;
}

export class RootStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: RootStackProps) {
    super(scope, id, props);

    console.log('REGION 👉', process.env.REGION);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'GazzdevQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    new AppStack(this, `${id}-app`, props);
  }
}
