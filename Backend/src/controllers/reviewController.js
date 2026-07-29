// src/controllers/reviewController.js
import asyncHandler from "../utils/asyncHandler.js";
import Review from "../models/Review.js";
import ServiceRequest from "../models/ServiceRequest.js";
import Notification from "../models/Notification.js";
// @route POST /api/reviews  (customer — leave a review for a completed request)
export const createReview = asyncHandler(async (req, res) => {
  const { request, rating, comment } = req.body;

  const serviceRequest = await ServiceRequest.findById(request);
  if (!serviceRequest) {
    res.status(404);
    throw new Error("Service request not found");
  }
  if (String(serviceRequest.customer) !== String(req.user._id)) {
    res.status(403);
    throw new Error("You can only review your own requests");
  }
  if (serviceRequest.status !== "completed") {
    res.status(400);
    throw new Error("You can only review completed requests");
  }

  const existing = await Review.findOne({ request });
  if (existing) {
    res.status(400);
    throw new Error("You've already reviewed this request");
  }

  const review = await Review.create({
  customer: req.user._id,
  request,
  rating,
  comment,
});

// Review request notification ko read mark kar do
await Notification.updateMany(
  {
    user: req.user._id,
    type: "review_request",
  },
  {
    isRead: true,
  }
);

res.status(201).json(review);

  
});

// @route GET /api/reviews/public  (public — Testimonials page, only approved reviews)
export const getPublicReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isPublic: true })
    .populate("customer", "name")
    .populate({ path: "request", populate: "service" })
    .sort({ createdAt: -1 })
    .limit(12);
  res.json(reviews);
});

// @route GET /api/reviews  (admin — all reviews, for moderation)
export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("customer", "name email")
    .populate({ path: "request", populate: "service" })
    .sort({ createdAt: -1 });
  res.json(reviews);
});

// @route PATCH /api/reviews/:id/visibility  (admin — approve/hide a review)
export const toggleReviewVisibility = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  review.isPublic = req.body.isPublic;
  await review.save();
  res.json(review);
});

// @route GET /api/reviews/my  (customer — check which of their requests already have reviews)
export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ customer: req.user._id });
  res.json(reviews);
});