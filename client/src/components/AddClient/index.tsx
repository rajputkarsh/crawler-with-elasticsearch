import { useForm } from "react-hook-form";
import { IClient } from "../../interfaces/Client";
import { DEFAULT_CLIENT_FIELDS } from "../../constants/client";
import { useDispatch } from "react-redux";
import { AppStore } from "../../redux/store";
import { useTransition } from "react";
import Loader from "../Loader";
import { addClient } from "../../redux/store/clients.slice";
import { toast } from "react-toastify";

function AddClient() {
  const dispatch = useDispatch<AppStore>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClient>({
    defaultValues: DEFAULT_CLIENT_FIELDS,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: IClient) => {
    startTransition(() => {
      dispatch(addClient({ ...data, pin: data.pin.toString() }))
        .then((resp: any) => {
          if (resp?.payload?.status == 200) {
            toast("Client Saved");
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          } else {
            toast("Something went wrong");
          }
        })
        .catch((error) => {
          toast("Something went wrong");
        });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter name"
          {...register("name", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter Email"
          {...register("email", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="date"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter Date"
          {...register("registrationDate", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter Category"
          {...register("companyCategory", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter Sub-Category"
          {...register("companySubCategory", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter Class"
          {...register("companyClass", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          minLength={21}
          maxLength={21}
          placeholder="Enter CIN"
          {...register("cin", {
            required: true,
            minLength: 21,
            maxLength: 21,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="number"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          minLength={6}
          maxLength={6}
          placeholder="Enter PIN"
          {...register("pin", {
            required: true,
            valueAsNumber: true,
            validate: (value) =>
              (value as unknown as number) >= 111111 &&
              (value as unknown as number) <= 999999,
            minLength: 6,
            maxLength: 6,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter State"
          {...register("state", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter Address"
          {...register("address", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter ROC"
          {...register("roc", {
            required: true,
          })}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control ${
            errors?.name ? "border border-danger border-2" : ""
          }`}
          placeholder="Enter Status"
          {...register("status", {
            required: true,
          })}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {isPending && <Loader />}
    </form>
  );
}

export default AddClient;
