import mongoose, { Document } from 'mongoose';

export interface ISnippet extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  code: string;
  programmingLanguage: string;
  description?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const snippetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    programmingLanguage: {
      type: String,
      required: true,
      enum: [
        'javascript',
        'typescript',
        'python',
        'java',
        'csharp',
        'cpp',
        'go',
        'rust',
        'php',
        'ruby',
        'swift',
        'kotlin',
        'html',
        'css',
        'sql',
        'bash',
        'powershell',
        'other',
      ],
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for search efficiency
snippetSchema.index({ title: 'text', description: 'text', code: 'text' }
);

export default mongoose.model<ISnippet>('Snippet', snippetSchema); 