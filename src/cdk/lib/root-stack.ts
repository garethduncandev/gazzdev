import * as cdk from "aws-cdk-lib";
import { NestedStackProps, RemovalPolicy, StackProps } from "aws-cdk-lib";
import {
  BlockPublicAccess,
  Bucket,
  HttpMethods,
  IBucket,
} from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { AppStack } from "./app-stack";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface RootStackProps extends StackProps {
  environment: string;
  color: string;
  domain: string;
  hostedZoneId: string;
  region: string;
  cloudFrontDomainCertificateArn: string;
  appName: string;
  removalPolicy: RemovalPolicy;
  bucketName: string;
}

export interface RootNestedStackProps extends NestedStackProps {
  rootStackProps: RootStackProps;
  bucket: IBucket;
}

export class RootStack extends cdk.Stack {
  public constructor(scope: Construct, id: string, props: RootStackProps) {
    super(scope, id, props);

    // for cloudfront hosting and any storage for the api
    const bucket = this.createBucket(props.bucketName, props.removalPolicy);

    const rootNestedStackProps = {
      bucket: bucket,
      rootStackProps: props,
    } as RootNestedStackProps;

    new AppStack(this, `${id}-app`, rootNestedStackProps);
  }

  private createBucket(
    bucketName: string,
    removalPolicy: RemovalPolicy
  ): IBucket {
    return new Bucket(this, `${bucketName}-bucket`, {
      removalPolicy: removalPolicy,
      bucketName: bucketName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedMethods: [HttpMethods.GET],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
    });
  }
}
