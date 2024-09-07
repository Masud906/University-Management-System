/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model } from 'mongoose';
import {
  TLocalGuardian,
  TStudent,
  TGuardian,
  TUserName,
  StudentModel,
} from './student.interface';
import { ref } from 'joi';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [20, 'Name can not ve more then allowed lenth is 20'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'father contactNo is required'],
  },
  motherName: {
    type: String,
    required: [true, 'mother name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'mother contactNo is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'localGuardain is required'],
  },
  occupation: {
    type: String,
    required: [true, 'guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'contactNo is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID  is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id  is required'],
      unique: true,
      ref: 'User',
    },
    name: userNameSchema,
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: "the gender filed can only 'male', 'female', or 'other'.",
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloogGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  // {
  //   toJSON: {
  //     virtuals: true,
  //   },
  // },
);

// virtual //////////                                errror
// studentSchema.virtual('fullName').get(function(){
//   return this.name.
// })
//Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); //
  next();
});

//crating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
