import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"


import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../../Upload"
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../../hook/dashboard"
import { COURSE_STATUS } from "../../../../../../utils/constants"
import { setCourse, setStep } from "../../../../../../../store/slice/courseSlice"


export default function CourseInformationForm() {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories() 
      
      // const categories = []; // to be comment
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      console.log("data populated", editCourse , course)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("thumbnailImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.thumbnailImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      const currentValues = getValues()
      console.log("changes after editing form values:", currentValues)
      console.log("now course:", course)
      console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseName)
        }
        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription)
        }
        if (currentValues.price !== course.price) {
          formData.append("price", data.price)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.tag))
        }
        if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.whatYouWillLearn)
        }
        if (currentValues.category._id !== course.category._id) {
          formData.append("category", data.category)
        }
        if (
          currentValues.instructions.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.instructions)
          )
        }
        if (currentValues.thumbnailImage !== course.thumbnailImage) {
          formData.append("thumbnailImage", data.thumbnailImage)
        }
        console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token, dispatch) 
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const newFromdata = new FormData()
  
 
    newFromdata.append("courseName", data.courseName)
    // newFromdata.append("testing", "testing")
    newFromdata.append("coureDiscription", data.coureDiscription)
    newFromdata.append("price", data.price)
    newFromdata.append("tag", JSON.stringify(data.tag))
    newFromdata.append("whatYouWillLearn", data.whatYouWillLearn)
    newFromdata.append("category", data.category)
    newFromdata.append("status", COURSE_STATUS.DRAFT)
    newFromdata.append("instructions", JSON.stringify(data.instructions))
    newFromdata.append("thumbnailImage", data.thumbnailImage)
    setLoading(true)
   
    const result = await addCourseDetails(newFromdata, token, dispatch)
    if (result && result.length) {
      console.log("course added successfully");
      console.log(result)
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }
  // console.log("from , is", getValues())

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseName">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseName"
          placeholder="Enter Course Title"
          {...register("courseName", { required: true })}
          className="form-style w-full"
        />
        {errors.courseName && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coureDiscription">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="coureDiscription"
          placeholder="Enter Description"
          {...register("coureDiscription", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.coureDiscription && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("price", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.price && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("category", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="tag"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="thumbnailImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("whatYouWillLearn", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.whatYouWillLearn && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="instructions"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        > 
           <MdNavigateNext />
        </IconBtn>
        
      </div>
    </form>
  )
}