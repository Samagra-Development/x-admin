import React from "react";

export const AssessmentsList = (props) => {
  return (
    <>
      {props?.options?.formUrl && (
        <iframe
          src={`${process.env.NEXT_PUBLIC_ENKETO_EXPRESS}/preview?xform=${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/${props?.options?.formUrl}`}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          width="100%"
          height="100%"
          title="Assessments Module"
        >
          Your browser does not support iframe. Visit the
          <a
            href={`${process.env.NEXT_PUBLIC_ENKETO_EXPRESS}/preview?xform=${process.env.NEXT_PUBLIC_ASSESSMENTS_MODULE_FORM_URL}/${props?.options?.formUrl}`}
          >
            Assessment Module
          </a>
        </iframe>
      )}
    </>
  );
};
