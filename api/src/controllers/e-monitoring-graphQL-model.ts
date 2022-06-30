import ClassMapping from "../datasources/ClassMapping";
import SchoolSupportMapping from "../datasources/SchoolSupportMapping";
import SubjectsMapping from "../datasources/SubjectsMapping";
import TeachingMethodMapping from "../datasources/TeachingMethodMapping";
import VisitTypeMapping from "../datasources/VisitTypeMapping";
import StudentAwarenessMapping from "../datasources/StudentAwarenessMapping";
import TeacherAwarenessMapping from "../datasources/TeacherAwarenessMapping";
import AwarenessUdaan1Mapping from "../datasources/AwarenessUdaan1Mapping";
import RemedialPeriodMapping from "../datasources/RemedialPeriodMapping";
import PrintedUdaanMapping from "../datasources/PrintedUdaanMapping";

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
        this.grade1_phy = this.getClass(data?.grade1_phy) ?? null;
        this.subject1_phy = this.getSubject(data?.subject1_phy) ?? null;
        this.subject1_phy_other = data?.subject1_phy_other ?? null;
        this.name1_phy = data?.name1_phy ?? null;
        this.display12 = data?.display12 ?? null;
        this.teachingmethod1_phy = this.getUpdatedTeachingMethod(data?.teachingmethod1_phy) ?? null;
        this.teachingmethod1_phy_other = data?.teachingmethod1_phy_other ?? null;
        this.engagement_level1 = data?.engagement_level1 ?? null;
        this.comprecord1_phy = this.booleanToText(data?.comprecord1_phy) ?? null;
        this.stu_grouping1 = data?.stu_grouping1 ?? null;
        this.display13 = data?.display13 ?? null;
        this.ques1_class1_fln = data?.ques1_class1_fln ?? null;
        this.ques2_class1_fln = data?.ques2_class1_fln ?? null;
        this.ques1_class1_phy = data?.ques1_class1_phy ?? null;
        this.ques2_class1_phy = data?.ques2_class1_phy ?? null;
        this.stu_awareness_1 = this.getUpdatedStudentAwareness(data?.stu_awareness_1) ?? null;
        this.display14 = data?.display14 ?? null;
        this.teacherfeedback1_phy = this.booleanToText(data?.teacherfeedback1_phy) ?? null;
        this.feedbackdetails11_phy = data?.feedbackdetails11_phy ?? null;
        this.feedbackdetails12_phy = data?.feedbackdetails12_phy ?? null;
        this.display21 = data?.display21 ?? null;
        this.grade2_phy = this.getClass(data?.grade2_phy) ?? null;
        this.subject2_phy = this.getSubject(data?.subject2_phy) ?? null;
        this.subject2_phy_other = data?.subject2_phy_other ?? null;
        this.name2_phy = data?.name2_phy ?? null;
        this.display22 = data?.display22 ?? null;
        this.teachingmethod2_phy = this.getUpdatedTeachingMethod(data?.teachingmethod2_phy) ?? null;
        this.teachingmethod2_phy_other = data?.teachingmethod2_phy_other ?? null;
        this.engagement_level2 = data?.engagement_level2 ?? null;
        this.comprecord2_phy = this.booleanToText(data?.comprecord2_phy) ?? null;
        this.stu_grouping2 = data?.stu_grouping2 ?? null;
        this.display23 = data?.display23 ?? null;
        this.ques1_class2_fln = data?.ques1_class2_fln ?? null;
        this.ques2_class2_fln = data?.ques2_class2_fln ?? null;
        this.ques1_class2_phy = data?.ques1_class2_phy ?? null;
        this.ques2_class2_phy = data?.ques2_class2_phy ?? null;
        this.stu_awareness_2 = this.getUpdatedStudentAwareness(data?.stu_awareness_2) ?? null;
        this.display24 = data?.display24 ?? null;
        this.teacherfeedback2_phy = this.booleanToText(data?.teacherfeedback2_phy) ?? null;
        this.feedbackdetails21_phy = data?.feedbackdetails21_phy ?? null;
        this.feedbackdetails22_phy = data?.feedbackdetails22_phy ?? null;
        this.display31 = data?.display31 ?? null;
        this.grade3_phy = this.getClass(data?.grade3_phy) ?? null;
        this.subject3_phy = this.getSubject(data?.subject3_phy) ?? null;
        this.subject3_phy_other = data?.subject3_phy_other ?? null;
        this.name3_phy = data?.name3_phy ?? null;
        this.display32 = data?.display32 ?? null;
        this.teachingmethod3_phy = this.getUpdatedTeachingMethod(data?.teachingmethod3_phy) ?? null;
        this.teachingmethod3_phy_other = data?.teachingmethod3_phy_other ?? null;
        this.engagement_level3 = data?.engagement_level3 ?? null;
        this.comprecord3_phy = this.booleanToText(data?.comprecord3_phy) ?? null;
        this.stu_grouping3 = data?.stu_grouping3 ?? null;
        this.display33 = data?.display33 ?? null;
        this.ques1_class3_fln = data?.ques1_class3_fln ?? null;
        this.ques2_class3_fln = data?.ques2_class3_fln ?? null;
        this.ques1_class3_phy = data?.ques1_class3_phy ?? null;
        this.ques2_class3_phy = data?.ques2_class3_phy ?? null;
        this.stu_awareness_3 = this.getUpdatedStudentAwareness(data?.stu_awareness_3) ?? null;
        this.display34 = data?.display34 ?? null;
        this.teacherfeedback3_phy = this.booleanToText(data?.teacherfeedback3_phy) ?? null;
        this.feedbackdetails31_phy = data?.feedbackdetails31_phy ?? null;
        this.feedbackdetails32_phy = data?.feedbackdetails32_phy ?? null;
        this.display0 = data?.display0 ?? null;
        this.schoolhead_phy = this.booleanToText(data?.schoolhead_phy) ?? null;
        this.schoolsupp_areas_phy = this.getUpdatedSchoolSupport(data?.schoolsupp_areas_phy) ?? null;
        this.schoolsupp_areas_phy_other = data?.schoolsupp_areas_phy_other ?? null;
        this.add_school_phy = data?.add_school_phy ?? null;
        this.display41 = data?.display41 ?? null;
        this.teacher_awareness = this.getUpdatedTeacherAwareness(data?.teacher_awareness) ?? null;
        this.display42 = data?.display42 ?? null;
        this.awareness_udaan = this.booleanToText(data?.awareness_udaan) ?? null;
        this.awareness_udaan1 = this.getUpdatedAwarenessUdaan1(data?.awareness_udaan1) ?? null;
        this.remedial_period = this.getUpdatedRemedialPeriod(data?.remedial_period) ?? null;
        this.digital_udaan = this.getDigitalUdaan(data?.digital_udaan) ?? null;
        this.printed_udaan = this.getPrintedUdaan(data?.printed_udaan) ?? null;
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

    getUpdatedTeachingMethod(teachingMethodArray: string[] | null): string[] | null {
        if (!teachingMethodArray) return null
        const updatedArray: string[] = []
        teachingMethodArray.forEach(value => {
            const result: string = <string>this.getTeachingMethod(value);
            updatedArray.push(result === '-' ? value : result);
        });
        return updatedArray;
    }

    getTeachingMethod(teachingMethodCode: string | null): string | null {
        if (!teachingMethodCode) return null;
        const teachingMethodMapping = new TeachingMethodMapping();
        if (!teachingMethodMapping.mapping[teachingMethodCode]) return '-';
        return teachingMethodMapping.mapping[teachingMethodCode];
    }

    getVisitType(visitTypeCode: string | null): string | null {
        if (!visitTypeCode) return null;
        const visitTypeMapping = new VisitTypeMapping();
        if (!visitTypeMapping.mapping[visitTypeCode]) return '-';
        return visitTypeMapping.mapping[visitTypeCode];
    }

    getSchoolSupportText(supportCode: string | null): string | null {
        if (!supportCode) return null;
        const schoolSupportMapping = new SchoolSupportMapping();
        if (!schoolSupportMapping.mapping[supportCode]) return '-';
        return schoolSupportMapping.mapping[supportCode];
    }

    getUpdatedStudentAwareness(studentAwarenessArray: string[] | null): string[] | null {
        if (!studentAwarenessArray) return null
        const updatedArray: string[] = []
        studentAwarenessArray.forEach(value => {
            updatedArray.push(<string>this.getStudentAwareness(value))
        })
        return updatedArray;
    }

    getStudentAwareness(studentAwarenessCode: string | null): string | null {
        if (!studentAwarenessCode) return null;
        const studentAwarenessMapping = new StudentAwarenessMapping();
        if (!studentAwarenessMapping.mapping[studentAwarenessCode]) return '-';
        return studentAwarenessMapping.mapping[studentAwarenessCode];
    }

    getUpdatedTeacherAwareness(teacherAwarenessArray: string[] | null): string[] | null {
        if (!teacherAwarenessArray) return null
        const updatedArray: string[] = []
        teacherAwarenessArray.forEach(value => {
            updatedArray.push(<string>this.getTeacherAwareness(value))
        })
        return updatedArray;
    }

    getTeacherAwareness(teacherAwarenessCode: string | null): string | null {
        if (!teacherAwarenessCode) return null;
        const teacherAwarenessMapping = new TeacherAwarenessMapping();
        if (!teacherAwarenessMapping.mapping[teacherAwarenessCode]) return '-';
        return teacherAwarenessMapping.mapping[teacherAwarenessCode];
    }

    getUpdatedAwarenessUdaan1(awarenessUdaan1Array: string[] | null): string[] | null {
        if (!awarenessUdaan1Array) return null
        const updatedArray: string[] = []
        awarenessUdaan1Array.forEach(value => {
            updatedArray.push(<string>this.getAwarenessUdaan1(value))
        })
        return updatedArray;
    }

    getAwarenessUdaan1(awarenessUdaan1Code: string | null): string | null {
        if (!awarenessUdaan1Code) return null;
        const awarenessUdaan1Mapping = new AwarenessUdaan1Mapping();
        if (!awarenessUdaan1Mapping.mapping[awarenessUdaan1Code]) return '-';
        return awarenessUdaan1Mapping.mapping[awarenessUdaan1Code];
    }

    getUpdatedRemedialPeriod(remedialPeriodArray: string[] | null): string[] | null {
        if (!remedialPeriodArray) return null
        const updatedArray: string[] = []
        remedialPeriodArray.forEach(value => {
            updatedArray.push(<string>this.getRemedialPeriod(value))
        })
        return updatedArray;
    }

    getRemedialPeriod(remedialPeriodCode: string | null): string | null {
        if (!remedialPeriodCode) return null;
        const remedialPeriodMapping = new RemedialPeriodMapping();
        if (!remedialPeriodMapping.mapping[remedialPeriodCode]) return '-';
        return remedialPeriodMapping.mapping[remedialPeriodCode];
    }

    getPrintedUdaan(printedUdaanCode: string | null): string | null {
        if (!printedUdaanCode) return null;
        const printedUdaanMapping = new PrintedUdaanMapping();
        if (!printedUdaanMapping.mapping[printedUdaanCode]) return '-';
        return printedUdaanMapping.mapping[printedUdaanCode];
    }

    getDigitalUdaan(digitalUdaanCode: string | null): string | null {
        if (!digitalUdaanCode) return null;
        const printedUdaanMapping = new PrintedUdaanMapping();
        if (!printedUdaanMapping.mapping[digitalUdaanCode]) return '-';
        return printedUdaanMapping.mapping[digitalUdaanCode];
    }

    booleanToText(booleanText: string | null): string | null {
        if (!booleanText) return null;
        if (booleanText === '0') {
            return 'No';
        } else if (booleanText === '1') {
            return 'Yes';
        } else {
            return '-';
        }
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
