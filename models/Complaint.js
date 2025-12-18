import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    category: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved', 'rejected', 'closed'],
      default: 'pending',
    },
    location: {
      type: String,
      default: '',
    },
    attachments: [{
      url: String,
      filename: String,
      fileType: String,
    }],
    aiAnalysis: {
      suggestedCategory: String,
      suggestedDepartment: String,
      confidence: Number,
      keywords: [String],
      sentiment: String,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updates: [{
      message: String,
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      status: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
    comments: [{
      text: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
    resolvedAt: {
      type: Date,
    },
    closedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ComplaintSchema.index({ userId: 1, status: 1 });
ComplaintSchema.index({ department: 1, status: 1 });
ComplaintSchema.index({ category: 1 });

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);
