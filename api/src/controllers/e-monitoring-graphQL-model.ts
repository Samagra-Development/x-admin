import SubjectsMapping from "../datasources/SubjectsMapping";

export class EMonitoring {
    user_name?: string | null;
    designation?: string | null;
    name?: string | null;
    school?: string | null;
    district?: string | null;
    block?: string | null;
    class6_grade ?: string | null;
    class7_grade ?: string | null;
    class8_grade ?: string | null;
    class6_subject ?: string | null;
    class7_subject ?: string | null;
    class8_subject ?: string | null;
    imp_feed6 ?: string | null;
    imp_feed7 ?: string | null;
    imp_feed8 ?: string | null;
    schoolsupport ?: string[] | null;
    date_call?: string | null;
    instanceID?: string | null;

    schoolhead?: string | null;
    pcl_tchr?: string | null;
    class6_subject_other?: string | null;
    ptotalst6 ?: number | null;
    ppresentst6 ?: number | null;
    lessonplan6?: string | null;
    lessonplansource6 ?: string[] | null;
    lessonplansource6_other?: string | null;
    content6 ?: string[] | null;
    content6_other?: string | null;
    interact6?: string | null;
    thw6?: string | null;
    comprecord6?: string | null;
    textb6 ?: number | null;
    ques1_6?: string | null;
    ques2_6?: string | null;
    class6_joinWA?: string | null;
    class6_onlineshare?: string | null;
    class6_TC?: string | null;
    pos_feed6?: string | null;
    class7_subject_other?: string | null;
    ptotalst7 ?: number | null;
    ppresentst7 ?: number | null;
    lessonplan7?: string | null;
    lessonplansource7 ?: string[] | null;
    lessonplansource7_other?: string | null;
    content7 ?: string[] | null;
    content7_other?: string | null;
    interact7?: string | null;
    thw7?: string | null;
    comprecord7?: string | null;
    textb7 ?: number | null;
    ques1_7?: string | null;
    ques2_7?: string | null;
    class7_joinWA?: string | null;
    class7_onlineshare?: string | null;
    class7_TC?: string | null;
    pos_feed7?: string | null;
    class8_subject_other?: string | null;
    ptotalst8 ?: number | null;
    ppresentst8 ?: number | null;
    lessonplan8?: string | null;
    lessonplansource8 ?: string[] | null;
    lessonplansource8_other?: string | null;
    content8 ?: string[] | null;
    content8_other?: string | null;
    interact8?: string | null;
    thw8?: string | null;
    comprecord8?: string | null;
    textb8 ?: number | null;
    ques1_8?: string | null;
    ques2_8?: string | null;
    class8_joinWA?: string | null;
    class8_onlineshare?: string | null;
    class8_TC?: string | null;
    pos_feed8?: string | null;
    schoolsupport_other?: string | null;
    start?: string | null;
    end?: string | null;
    today?: string | null;
    deviceid?: string | null;
    subscriberid?: string | null;
    simserial?: string | null;
    username?: string | null;
    phonenumber?: string | null;

    operationsDoc = `mutation InsertMonitoringDetails($object: monitoring_visit_new_insert_input!) {
        insert_monitoring_visit_new_one(object: $object) {
            instanceID
        }
    }`;
    variableName = `object`;
    operationName = `InsertMonitoringDetails`;
    databaseOperationName = `insert_monitoring_visit_new_one`;

    constructor(data: any) {
        this.user_name = data?.user_name ?? null;
        this.designation = data.designation ?? null;
        this.name = data.name ?? null;
        this.school = data.school ?? null;
        this.district = data.district ?? null;
        this.block = data.block ?? null;
        this.date_call = data.date_call ?? null;
        this.class6_grade = this.getClass(data?.class6_grade) ?? null;
        this.class7_grade = this.getClass(data?.class7_grade) ?? null;
        this.class8_grade = this.getClass(data?.class8_grade) ?? null;
        this.class6_subject = this.getSubject(data?.class6_subject) ?? null;
        this.class7_subject = this.getSubject(data?.class7_subject) ?? null;
        this.class8_subject = this.getSubject(data?.class8_subject) ?? null;
        this.imp_feed6 = data?.imp_feed6 ?? null;
        this.imp_feed7 = data?.imp_feed7 ?? null;
        this.imp_feed8 = data?.imp_feed8 ?? null;
        this.schoolsupport = this.getUpdatedSchoolSupport(data?.schoolsupport) ?? null;
        this.instanceID = data.instanceID?.replace("uuid:", "") ?? null;

        this.thw6 = data?.thw6 ?? null;
        this.comprecord6 = data?.comprecord6 ?? null;
        this.textb6 = data?.textb6 ?? null;
        this.ques1_6 = data?.ques1_6 ?? null;
        this.ques2_6 = data?.ques2_6 ?? null;
        this.class6_joinWA = data?.class6_joinWA ?? null;
        this.class6_onlineshare = data?.class6_onlineshare ?? null;
        this.class6_TC = data?.class6_TC ?? null;
        this.pos_feed6 = data?.pos_feed6 ?? null;
        this.class7_subject_other = data?.class7_subject_other ?? null;
        this.ptotalst7 = data?.ptotalst7 ?? null;
        this.ppresentst7 = data?.ppresentst7 ?? null;
        this.lessonplan7 = data?.lessonplan7 ?? null;
        this.lessonplansource7 = data?.lessonplansource7 ?? null;
        this.lessonplansource7_other = data?.lessonplansource7_other ?? null;
        this.content7 = data?.content7 ?? null;
        this.content7_other = data?.content7_other ?? null;
        this.interact7 = data?.interact7 ?? null;
        this.thw7 = data?.thw7 ?? null;
        this.comprecord7 = data?.comprecord7 ?? null;
        this.textb7 = data?.textb7 ?? null;
        this.ques1_7 = data?.ques1_7 ?? null;
        this.ques2_7 = data?.ques2_7 ?? null;
        this.class7_joinWA = data?.class7_joinWA ?? null;
        this.class7_onlineshare = data?.class7_onlineshare ?? null;
        this.class7_TC = data?.class7_TC ?? null;
        this.pos_feed7 = data?.pos_feed7 ?? null;
        this.class8_subject_other = data?.class8_subject_other ?? null;
        this.ptotalst8 = data?.ptotalst8 ?? null;
        this.ppresentst8 = data?.ppresentst8 ?? null;
        this.lessonplan8 = data?.lessonplan8 ?? null;
        this.lessonplansource8 = data?.lessonplansource8 ?? null;
        this.lessonplansource8_other = data?.lessonplansource8_other ?? null;
        this.content8 = data?.content8 ?? null;
        this.content8_other = data?.content8_other ?? null;
        this.interact8 = data?.interact8 ?? null;
        this.thw8 = data?.thw8 ?? null;
        this.comprecord8 = data?.comprecord8 ?? null;
        this.textb8 = data?.textb8 ?? null;
        this.ques1_8 = data?.ques1_8 ?? null;
        this.ques2_8 = data?.ques2_8 ?? null;
        this.class8_joinWA = data?.class8_joinWA ?? null;
        this.class8_onlineshare = data?.class8_onlineshare ?? null;
        this.class8_TC = data?.class8_TC ?? null;
        this.pos_feed8 = data?.pos_feed8 ?? null;
        this.schoolsupport_other = data?.schoolsupport_other ?? null;
        this.phonenumber = data?.phonenumber ?? null;

    }

    getUpdatedSchoolSupport(supportArray: string[] | null): string[] | null {
        if (!supportArray) return null
        const updatedArray: string[] = []
        supportArray.forEach(value => {
            updatedArray.push(<string>this.getSchoolSupportText(value))
        })
        return updatedArray;
    }

    getSubject(subjectCode: string | null): string | null {
        if (!subjectCode) return null;
        const subjectsMapping = new SubjectsMapping();
        if (!subjectsMapping.mapping[subjectCode]) return '-';
        return subjectsMapping.mapping[subjectCode];
    }

    getClass(classCode: string | null): string | null {
        if (!classCode) return null;
        const classMapping = new ClassMapping();
        if (!classMapping.mapping[classCode]) return '-';
        return classMapping.mapping[classCode];
    }

    getSchoolSupportText(supportCode: string | null): string | null {
        if (!supportCode) return null;
        const schoolSupportMapping = new SchoolSupportMapping();
        if (!schoolSupportMapping.mapping[supportCode]) return '-';
        return schoolSupportMapping.mapping[supportCode];
    }

    convertToBoolean(response: string): boolean {
        if (response?.charAt(response.length - 1) === 'y') return true;
        else return false;
    }

    convertToString(response: number): string | null {
        if (response) {
            return String(response);
        }
        return null;
    }
}

import ClassMapping from "../datasources/ClassMapping";
import SchoolSupportMapping from "../datasources/SchoolSupportMapping";
