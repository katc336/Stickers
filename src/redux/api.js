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
    tagTypes: ["User", "Class", "Student", "Lesson", "Objective", "Progress"],

    endpoints: (builder) => ({
        //<-----------AUTHORIZATION----------->
        //REGISTER ACCOUNT ENDPOINT
        register: builder.mutation({
            query: (user) => ({
                url: `/auth/register`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["User"]
        }),
        //LOGIN ACCOUNT 
        login: builder.mutation({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["User"]
        }),
        //<------------GET USER INFO------------>
        //GET USER
        getUser: builder.query({
            query: () => ({
                url: `/auth/account`,
                method: 'GET',
            }),
            providesTags: ["User"]
        }),
        //<------------CLASSES------------>
        postNewClass: builder.mutation({
            query: (newClass) => ({
                url: `/api/class`,
                method: 'POST',
                body: newClass,
            }),
            invalidatesTags: ["Class"]
        }),
        getClasses: builder.query({
            query: () => ({
                url: `/api/my_classes`,
                method: 'GET'
            }),
            providesTags: ["Class"]
        }),
        getSingleClass: builder.query({
            query: (id) => ({
                url: `/api/my_classes/${id}`,
                method: 'GET'
            }),
            providesTags: ["Class", "Student", "Lesson"]
        }),
        //<------------STUDENTS------------>
        postNewStudent: builder.mutation({
            query: ({ name, id }) => ({
                url: `/api/add_student`,
                method: 'POST',
                body: { name, id },
            }),
            invalidatesTags: ["Class", "Student", "Lesson"]
        }),
        getAllStudentsByTeacher: builder.query({
            query: () => ({
                url: `/api/my_students`,
                method: 'GET'
            }),
            providesTags: ["Student"]
        }),
        getAllStudentsByClass: builder.query({
            query: () => ({
                url: `/api/students`,
                method: 'GET'
            }),
            providesTags: ["Student"]
        }),
        getSingleStudent: builder.query({
            query: (id) => ({
                url: `/api/student/${id}`,
                method: 'GET'
            }),
            providesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        //<------------LESSONS------------>
        postNewLesson: builder.mutation({
            query: ({ id, lessonName }) => ({
                url: `/api/lesson`,
                method: 'POST',
                body: { id, lessonName },
            }),
            invalidatesTags: ["Lesson", "Class"]
        }),
        getAllLessons: builder.query({
            query: () => ({
                url: `/api/lessons`,
                method: 'GET'
            }),
            providesTags: ["Lesson"]
        }),
        getSingleLesson: builder.query({
            query: (id) => ({
                url: `/api/lesson/${id}`,
                method: 'GET'
            }),
            providesTags: ["Lesson"]
        }),
        //<------------LEARNING OBJECTIVES------------>
        postNewObjective: builder.mutation({
            query: ({ id, objectiveName }) => ({
                url: `/api/objective`,
                method: 'POST',
                body: { id, objectiveName },
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        getAllObjectives: builder.query({
            query: () => ({
                url: `/api/my_lesson-objecives`,
                method: 'GET'
            }),
            providesTags: ["Objective"]
        }),
        getSingleObjective: builder.query({
            query: (id) => ({
                url: `/api/lesson/objective/${id}`,
                method: 'GET'
            }),
            providesTags: ["Objective"]
        }),
        //<------------STUDNET PROGRESS------------>
        getAllProgress: builder.query({
            query: () => ({
                url: `/api/progress`,
                method: 'GET'
            }),
            providesTags: ["Progress"]
        }),
        postProgress: builder.mutation({
            query: ({ studentId, objectiveId, progressPercent, combinedObjectiveId }) => ({
                url: `/api/studentProgress`,
                method: 'POST',
                body: { studentId, objectiveId, progressPercent, combinedObjectiveId },
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        //<------------ALL DELETE------------>
        deleteClass: builder.mutation({
            query: (id) => ({
                url: `/api/delete_class/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/api/delete_student/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        deleteLesson: builder.mutation({
            query: (id) => ({
                url: `/api/delete_lesson/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
        deleteObjective: builder.mutation({
            query: (id) => ({
                url: `/api/delete_objective/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Class", "Student", "Lesson", "Objective"]
        }),
    })
});
export default api;
export const {
    //Authorization
    useRegisterMutation,
    useLoginMutation,
    //User Information
    useGetUserQuery,
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
    //ALL DELETE
    useDeleteClassMutation,
    useDeleteStudentMutation,
    useDeleteLessonMutation,
    useDeleteObjectiveMutation,
} = api