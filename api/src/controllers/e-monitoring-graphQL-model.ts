import SubjectsMapping from "../datasources/SubjectsMapping";

export class EMonitoring {
    user_name ?: string | null;
    designation ?: string | null;
    name ?: string | null;
    district ?: string | null;
    block ?: string | null;
    school ?: string | null;
    date_phy ?: string | null;
    totalclasses ?: string | null;
    display11 ?: string | null;
    grade1_phy ?: string | null;
    subject1_phy ?: string | null;
    subject1_phy_other ?: string | null;
    name1_phy ?: string | null;
    display12 ?: string | null;
    teachingmethod1_phy ?: string[] | null;
    teachingmethod1_phy_other ?: string | null;
    engagement_level1 ?: string | null;
    comprecord1_phy ?: string | null;
    stu_grouping1 ?: string | null;
    display13 ?: string | null;
    ques1_class1_fln ?: string | null;
    ques2_class1_fln ?: string | null;
    ques1_class1_phy ?: string | null;
    ques2_class1_phy ?: string | null;
    stu_awareness_1 ?: string[] | null;
    display14 ?: string | null;
    teacherfeedback1_phy ?: string | null;
    feedbackdetails11_phy ?: string | null;
    feedbackdetails12_phy ?: string | null;
    display21 ?: string | null;
    grade2_phy ?: string | null;
    subject2_phy ?: string | null;
    subject2_phy_other ?: string | null;
    name2_phy ?: string | null;
    display22 ?: string | null;
    teachingmethod2_phy ?: string[] | null;
    teachingmethod2_phy_other ?: string | null;
    engagement_level2 ?: string | null;
    comprecord2_phy ?: string | null;
    stu_grouping2 ?: string | null;
    display23 ?: string | null;
    ques1_class2_fln ?: string | null;
    ques2_class2_fln ?: string | null;
    ques1_class2_phy ?: string | null;
    ques2_class2_phy ?: string | null;
    stu_awareness_2 ?: string[] | null;
    display24 ?: string | null;
    teacherfeedback2_phy ?: string | null;
    feedbackdetails21_phy ?: string | null;
    feedbackdetails22_phy ?: string | null;
    display31 ?: string | null;
    grade3_phy ?: string | null;
    subject3_phy ?: string | null;
    subject3_phy_other ?: string | null;
    name3_phy ?: string | null;
    display32 ?: string | null;
    teachingmethod3_phy ?: string[] | null;
    teachingmethod3_phy_other ?: string | null;
    engagement_level3 ?: string | null;
    comprecord3_phy ?: string | null;
    stu_grouping3 ?: string | null;
    display33 ?: string | null;
    ques1_class3_fln ?: string | null;
    ques2_class3_fln ?: string | null;
    ques1_class3_phy ?: string | null;
    ques2_class3_phy ?: string | null;
    stu_awareness_3 ?: string[] | null;
    display34 ?: string | null;
    teacherfeedback3_phy ?: string | null;
    feedbackdetails31_phy ?: string | null;
    feedbackdetails32_phy ?: string | null;
    display0 ?: string | null;
    schoolhead_phy ?: string | null;
    schoolsupp_areas_phy ?: string[] | null;
    schoolsupp_areas_phy_other ?: string | null;
    add_school_phy ?: string | null;
    display41 ?: string | null;
    teacher_awareness ?: string[] | null;
    display42 ?: string | null;
    awareness_udaan ?: string | null;
    awareness_udaan1 ?: string[] | null;
    remedial_period ?: string[] | null;
    digital_udaan ?: string | null;
    printed_udaan ?: string | null;
    udaan_challenges ?: string | null;
    udaan_best ?: string | null;
    start ?: string | null;
    end ?: string | null;
    today ?: string | null;
    deviceid ?: string | null;
    subscriberid ?: string | null;
    simserial ?: string | null;
    username ?: string | null;
    phonenumber ?: string | null;
    instanceID ?: string | null;

    operationsDoc = `mutation InsertMonitoringDetails($object: monitoring_visit_june_insert_input!) {
        insert_monitoring_visit_june_one(object: $object) {
            instanceID
        }
    }`;
    variableName = `object`;
    operationName = `InsertMonitoringDetails`;
    databaseOperationName = `insert_monitoring_visit_june_one`;

    constructor(data: any) {
        this.user_name = data?.user_name ?? null;
        this.designation = data?.designation ?? null;
        this.name = data?.name ?? null;
        this.district = data?.district ?? null;
        this.block = data?.block ?? null;
        this.school = data?.school ?? null;
        this.date_phy = data?.date_phy ?? null;
        this.totalclasses = data?.totalclasses ?? null;
        this.display11 = data?.display11 ?? null;
        this.grade1_phy = data?.grade1_phy ?? null;
        this.subject1_phy = data?.subject1_phy ?? null;
        this.subject1_phy_other = data?.subject1_phy_other ?? null;
        this.name1_phy = data?.name1_phy ?? null;
        this.display12 = data?.display12 ?? null;
        this.teachingmethod1_phy = data?.teachingmethod1_phy ?? null;
        this.teachingmethod1_phy_other = data?.teachingmethod1_phy_other ?? null;
        this.engagement_level1 = data?.engagement_level1 ?? null;
        this.comprecord1_phy = data?.comprecord1_phy ?? null;
        this.stu_grouping1 = data?.stu_grouping1 ?? null;
        this.display13 = data?.display13 ?? null;
        this.ques1_class1_fln = data?.ques1_class1_fln ?? null;
        this.ques2_class1_fln = data?.ques2_class1_fln ?? null;
        this.ques1_class1_phy = data?.ques1_class1_phy ?? null;
        this.ques2_class1_phy = data?.ques2_class1_phy ?? null;
        this.stu_awareness_1 = data?.stu_awareness_1 ?? null;
        this.display14 = data?.display14 ?? null;
        this.teacherfeedback1_phy = data?.teacherfeedback1_phy ?? null;
        this.feedbackdetails11_phy = data?.feedbackdetails11_phy ?? null;
        this.feedbackdetails12_phy = data?.feedbackdetails12_phy ?? null;
        this.display21 = data?.display21 ?? null;
        this.grade2_phy = data?.grade2_phy ?? null;
        this.subject2_phy = data?.subject2_phy ?? null;
        this.subject2_phy_other = data?.subject2_phy_other ?? null;
        this.name2_phy = data?.name2_phy ?? null;
        this.display22 = data?.display22 ?? null;
        this.teachingmethod2_phy = data?.teachingmethod2_phy ?? null;
        this.teachingmethod2_phy_other = data?.teachingmethod2_phy_other ?? null;
        this.engagement_level2 = data?.engagement_level2 ?? null;
        this.comprecord2_phy = data?.comprecord2_phy ?? null;
        this.stu_grouping2 = data?.stu_grouping2 ?? null;
        this.display23 = data?.display23 ?? null;
        this.ques1_class2_fln = data?.ques1_class2_fln ?? null;
        this.ques2_class2_fln = data?.ques2_class2_fln ?? null;
        this.ques1_class2_phy = data?.ques1_class2_phy ?? null;
        this.ques2_class2_phy = data?.ques2_class2_phy ?? null;
        this.stu_awareness_2 = data?.stu_awareness_2 ?? null;
        this.display24 = data?.display24 ?? null;
        this.teacherfeedback2_phy = data?.teacherfeedback2_phy ?? null;
        this.feedbackdetails21_phy = data?.feedbackdetails21_phy ?? null;
        this.feedbackdetails22_phy = data?.feedbackdetails22_phy ?? null;
        this.display31 = data?.display31 ?? null;
        this.grade3_phy = data?.grade3_phy ?? null;
        this.subject3_phy = data?.subject3_phy ?? null;
        this.subject3_phy_other = data?.subject3_phy_other ?? null;
        this.name3_phy = data?.name3_phy ?? null;
        this.display32 = data?.display32 ?? null;
        this.teachingmethod3_phy = data?.teachingmethod3_phy ?? null;
        this.teachingmethod3_phy_other = data?.teachingmethod3_phy_other ?? null;
        this.engagement_level3 = data?.engagement_level3 ?? null;
        this.comprecord3_phy = data?.comprecord3_phy ?? null;
        this.stu_grouping3 = data?.stu_grouping3 ?? null;
        this.display33 = data?.display33 ?? null;
        this.ques1_class3_fln = data?.ques1_class3_fln ?? null;
        this.ques2_class3_fln = data?.ques2_class3_fln ?? null;
        this.ques1_class3_phy = data?.ques1_class3_phy ?? null;
        this.ques2_class3_phy = data?.ques2_class3_phy ?? null;
        this.stu_awareness_3 = data?.stu_awareness_3 ?? null;
        this.display34 = data?.display34 ?? null;
        this.teacherfeedback3_phy = data?.teacherfeedback3_phy ?? null;
        this.feedbackdetails31_phy = data?.feedbackdetails31_phy ?? null;
        this.feedbackdetails32_phy = data?.feedbackdetails32_phy ?? null;
        this.display0 = data?.display0 ?? null;
        this.schoolhead_phy = data?.schoolhead_phy ?? null;
        this.schoolsupp_areas_phy = data?.schoolsupp_areas_phy ?? null;
        this.schoolsupp_areas_phy_other = data?.schoolsupp_areas_phy_other ?? null;
        this.add_school_phy = data?.add_school_phy ?? null;
        this.display41 = data?.display41 ?? null;
        this.teacher_awareness = data?.teacher_awareness ?? null;
        this.display42 = data?.display42 ?? null;
        this.awareness_udaan = data?.awareness_udaan ?? null;
        this.awareness_udaan1 = data?.awareness_udaan1 ?? null;
        this.remedial_period = data?.remedial_period ?? null;
        this.digital_udaan = data?.digital_udaan ?? null;
        this.printed_udaan = data?.printed_udaan ?? null;
        this.udaan_challenges = data?.udaan_challenges ?? null;
        this.udaan_best = data?.udaan_best ?? null;
        this.start = data?.start ?? null;
        this.end = data?.end ?? null;
        this.today = data?.today ?? null;
        this.deviceid = data?.deviceid ?? null;
        this.subscriberid = data?.subscriberid ?? null;
        this.simserial = data?.simserial ?? null;
        this.username = data?.username ?? null;
        this.phonenumber = data?.phonenumber ?? null;
        this.instanceID = data.instanceID?.replace("uuid:", "") ?? null;
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
