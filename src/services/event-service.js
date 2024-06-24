import {
    createEvent as createEventRepo,
    updateEvent as updateEventRepo,
    deleteEvent as deleteEventRepo,
    getEventById as getEventByIdRepo,
    getEventDetailsById as getEventDetailsByIdRepo,
    getEventEnrollments as getEventEnrollmentsRepo,
    getEvents as getEventsRepo,
    searchEvents as searchEventsRepo,
    enrollInEventRepo,
    removeEnrollmentRepo,
    rateEventRepo
} from '../repositories/event-repository.js';

export const createEvent = async (eventData) => {
    return createEventRepo(eventData);
};

export const updateEvent = async (eventData) => {
    return updateEventRepo(eventData);
};

export const deleteEvent = async (eventId) => {
    return deleteEventRepo(eventId);
};

export const getEventById = async (eventId) => {
    return getEventByIdRepo(eventId);
};

export const getEventDetailsById = async (eventId) => {
    return getEventDetailsByIdRepo(eventId);
};

export const getEventEnrollments = async (eventId, filters) => {
    return getEventEnrollmentsRepo(eventId, filters);
};

export const getEvents = async (limit, offset) => {
    return getEventsRepo(limit, offset);
};

export const searchEvents = async (filters) => {
    return searchEventsRepo(filters);
};

export const enrollInEvent = async (eventId, userId) => {
    return enrollInEventRepo(eventId, userId);
};

export const removeEnrollment = async (eventId, userId) => {
    return removeEnrollmentRepo(eventId, userId);
};

export const cancelEnrollment = async (eventId, userId) => {
    return removeEnrollmentRepo(eventId, userId);
};

export const rateEvent = async (eventId, enrollmentId, rating, observations) => {
    return rateEventRepo(eventId, enrollmentId, rating, observations);
};