import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = "/";

const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: backendURL,

        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ["User", "Parent", "Class", "Student", "Lesson", "Objective", "Progress", "StudentAccount"],

    endpoints: (builder) => ({
        //<-----------TEACHER'S AUTHORIZATION----------->
        //REGISTER TEACHER'S ACCOUNT
        register: builder.mutation({
            query: (user) => ({
                url: `/auth/register`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["User"]
        }),
        //LOGIN TEACHER'S ACCOUNT 
        login: builder.mutation({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["User"]
        }),
        //<-----------PARENT AUTHORIZATION----------->
        //REGISTER PARENT ACCOUNT 
        parentRegister: builder.mutation({
            query: (parent) => ({
                url: `/auth/register_parent`,
                method: 'POST',
                body: parent,
            }),
            providesTags: ["Parent"]
        }),
        //LOGIN PARENT ACCOUNT 
        parentLogin: builder.mutation({
            query: (parent) => ({
                url: `/auth/login_parent`,
                method: 'POST',
                body: parent,
            }),
            providesTags: ["Parent"]
        }),
        //<-----------STUDENT'S AUTHORIZATION----------->
        //REGISTER STUDNET'S ACCOUNT
        studentRegister: builder.mutation({
            query: (user) => ({
                url: `/auth/register_student`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["StudentAccount"]
        }),
        //LOGIN STUDNET'S ACCOUNT 
        studentLogin: builder.mutation({
            query: (user) => ({
                url: `/auth/login_student`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["StudentAccount"]
        }),
        //<------------GET USER'S ACCOUNT------------>
        //GET TEACHER'S ACCOUNT
        getTeacher: builder.query({
            query: () => ({
                url: `/auth/account`,
                method: 'GET',
            }),
            providesTags: ["User"]
        }),
        //GET PARENT'S ACCOUNT
        getParent: builder.query({
            query: () => ({
                url: `/auth/account_parent`,
                method: 'GET',
            }),
            providesTags: ["Parent"]
        }),
        //GET STUDNET'S ACCOUNT
        getStudentAccount: builder.query({
            query: () => ({
                url: `/auth/account_student`,
                method: 'GET',
            }),
            providesTags: ["StudentAccount"]
        }),
        //<------------UPDATE USER INFO------------>
        postNewUserProfile: builder.mutation({
            query: (newImg) => ({
                url: `/api/add_profile`,
                method: 'PATCH',
                body: newImg,
            }),
            invalidatesTags: ["User"]
        }),
        //<------------CLASSES------------>
        postNewClass: builder.mutation({
            query: (newClass) => ({
                url: `/teacherClass/class`,
                method: 'POST',
                body: newClass,
            }),
            invalidatesTags: ["Class"]
        }),
        getClasses: builder.query({
            query: () => ({
                url: `/teacherClass/my_classes`,
                method: 'GET'
            }),
            providesTags: ["Class"]
        }),
        getSingleClass: builder.query({
            query: (id) => ({
                url: `/teacherClass/my_classes/${id}`,
                method: 'GET'
            }),
            providesTags: ["Class", "Student", "Lesson"]
        }),
        //<------------STUDENTS------------>
        postNewStudent: builder.mutation({
            query: ({ name, id }) => ({
                url: `/teacherClass/add_student`,
                method: 'POST',
                body: { name, id },
            }),
            invalidatesTags: ["Class", "Student", "Lesson"]
        }),
        getAllStudentsByTeacher: builder.query({
            query: () => ({
                url: `/teacherStudents/my_students`,
                method: 'GET'
            }),
            providesTags: ["Student"]
        }),
        getAllStudentsByClass: builder.query({
            query: () => ({
                url: `/teacherStudents/students`,
                method: 'GET'
            }),
            providesTags: ["Student"]
        }),
        getSingleStudent: builder.query({
            query: (id) => ({
                url: `/teacherStudents/student/${id}`,
                method: 'GET'
            }),
            providesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        //<------------LESSONS------------>
        postNewLesson: builder.mutation({
            query: ({ id, lessonName }) => ({
                url: `/teacherLesson/lesson`,
                method: 'POST',
                body: { id, lessonName },
            }),
            invalidatesTags: ["Lesson", "Class"]
        }),
        getAllLessons: builder.query({
            query: () => ({
                url: `/teacherLesson/lessons`,
                method: 'GET'
            }),
            providesTags: ["Lesson"]
        }),
        getSingleLesson: builder.query({
            query: (id) => ({
                url: `/teacherLesson/lesson/${id}`,
                method: 'GET'
            }),
            providesTags: ["Lesson"]
        }),
        //<------------LEARNING OBJECTIVES------------>
        postNewObjective: builder.mutation({
            query: ({ id, objectiveName }) => ({
                url: `/teacherObjective/objective`,
                method: 'POST',
                body: { id, objectiveName },
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        getAllObjectives: builder.query({
            query: () => ({
                url: `/teacherObjective/my_lesson-objecives`,
                method: 'GET'
            }),
            providesTags: ["Objective"]
        }),
        getSingleObjective: builder.query({
            query: (id) => ({
                url: `/teacherObjective/lesson/objective/${id}`,
                method: 'GET'
            }),
            providesTags: ["Objective"]
        }),
        //<------------STUDNET PROGRESS------------>
        getAllProgress: builder.query({
            query: () => ({
                url: `/teacherProgress/progress`,
                method: 'GET'
            }),
            providesTags: ["Progress"]
        }),
        postProgress: builder.mutation({
            query: ({ studentId, objectiveId, progressPercent, combinedObjectiveId }) => ({
                url: `/teacherProgress/studentProgress`,
                method: 'POST',
                body: { studentId, objectiveId, progressPercent, combinedObjectiveId },
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        //<------------ALL DELETE------------>
        deleteClass: builder.mutation({
            query: (id) => ({
                url: `/teacherClass/delete_class/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/teacherStudents/delete_student/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        deleteLesson: builder.mutation({
            query: (id) => ({
                url: `/teacherLesson/delete_lesson/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        deleteObjective: builder.mutation({
            query: (id) => ({
                url: `/teacherObjective/delete_objective/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        deleteProgress: builder.mutation({
            query: (id) => ({
                url: `/teacherProgress/delete_progress/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/teacherAssignment/delete_assignment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        //<------------ATTENDANCE------------>
        updateAttendance: builder.mutation({
            query: ({ studentId, lessonId, attendance }) => ({
                url: `/api/attendance`,
                method: "PATCH",
                body: { attendance, lessonId, studentId }
            })
        }),
        //<------------ASSIGNMENTS------------>
        //Teacher Assignment
        teacherPostAssignment: builder.mutation({
            query: ({ name, task, dueDate, dueTime, classId, lessonId }) => ({
                url: `/teacherAssignment/new_assignment`,
                method: "POST",
                body: { name, task, dueDate, dueTime, classId, lessonId }
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        //Student Assignment
        studentPostSubmission: builder.mutation({
            query: ({ name, content, assignmentId, studentId }) => ({
                url: `/teacherAssignment/new_assignment`,
                method: "POST",
                body: { name, content, assignmentId, studentId }
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        getSingleAssignmentsForStudent: builder.query({
            query: (id) => ({
                url: `studentAssignment//student_submission/${id}`,
                method: 'GET'
            }),
            providesTags: ["Assignment"]
        }),
    })
});
export default api;
export const {
    //Authorization
    useRegisterMutation,
    useLoginMutation,
    //Parent Authorization
    useParentLoginMutation,
    useParentRegisterMutation,
    //Student Authorization
    useStudentLoginMutation,
    useStudentRegisterMutation,
    //Get User Accounts
    useGetTeacherQuery,
    useGetParentQuery,
    useGetStudentAccountQuery,
    //Update User Information
    usePostNewUserProfileMutation,
    //Classes
    usePostNewClassMutation,
    useGetClassesQuery,
    useGetSingleClassQuery,
    //Students
    usePostNewStudentMutation,
    useGetAllStudentsByTeacherQuery,
    useGetAllStudentsByClassQuery,
    useGetSingleStudentQuery,
    //Lessons
    usePostNewLessonMutation,
    useGetAllLessonsQuery,
    useGetSingleLessonQuery,
    //Learning Objectives
    usePostNewObjectiveMutation,
    useGetAllObjectivesQuery,
    useGetSingleObjectiveQuery,
    //Student Progress
    useGetAllProgressQuery,
    usePostProgressMutation,
    //All deltes
    useDeleteClassMutation,
    useDeleteStudentMutation,
    useDeleteLessonMutation,
    useDeleteObjectiveMutation,
    useDeleteProgressMutation,
    useDeleteAssignmentMutation,
    //Attendance
    useUpdateAttendanceMutation,
    //Assignments
    useTeacherPostAssignmentMutation,
    useStudentPostSubmissionMutation,
    useGetSingleAssignmentsForStudentQuery,
} = api