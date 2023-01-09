import { NestedStack } from "aws-cdk-lib";
import { Certificate, ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  AllowedMethods,
  Distribution,
  OriginAccessIdentity,
  OriginRequestPolicy,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { ExportHelper } from "./helpers/exports";
import { OriginAccessIdentityHelper } from "./helpers/origin-access-identity";
import { RootNestedStackProps } from "./root-stack";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AppStack extends NestedStack {
  public constructor(
    scope: Construct,
    id: string,
    props: RootNestedStackProps
  ) {
    super(scope, id, props);

    // S3 bucket to host angular application, to be served up via cloudfront
    const cloudFrontDomainCertificate = this.cloudFrontDomainCertificate(
      id,
      props.rootStackProps.cloudFrontDomainCertificateArn
    );

    const originAccessIdentity =
      OriginAccessIdentityHelper.originAccessIdentity(this, id);

    const cloudFrontDistribution = this.cloudFrontDistribution(
      id,
      props.rootStackProps.domain,
      cloudFrontDomainCertificate,
      originAccessIdentity,
      props.bucket
    );

    // So we can query this to invalidate if required
    ExportHelper.createExport(
      this,
      id,
      cloudFrontDistribution.distributionId,
      "cloudfront distributionId",
      "appCloudFrontDistributionId"
    );
  }

  private cloudFrontDistribution(
    stackName: string,
    domain: string,
    cloudFrontDomainCertificate: ICertificate,
    originAccessIdentity: OriginAccessIdentity,
    bucket: IBucket
  ): Distribution {
    const domainNames: string[] = [domain];

    const distibution = new Distribution(this, `${stackName}-distibution`, {
      defaultBehavior: {
        origin: new S3Origin(bucket, {
          originAccessIdentity: originAccessIdentity,
          originPath: `/app`,
        }),

        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        originRequestPolicy: OriginRequestPolicy.CORS_S3_ORIGIN,
        responseHeadersPolicy:
          ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS_WITH_PREFLIGHT,
      },
      domainNames: domainNames,

      certificate: cloudFrontDomainCertificate,
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    bucket.grantRead(originAccessIdentity);

    return distibution;
  }

  private cloudFrontDomainCertificate(
    stackName: string,
    cloudFrontDomainCertificateArn: string
  ): ICertificate {
    return Certificate.fromCertificateArn(
      this,
      `${stackName}-cloudfront-certificate`,
      cloudFrontDomainCertificateArn
    );
  }
}
