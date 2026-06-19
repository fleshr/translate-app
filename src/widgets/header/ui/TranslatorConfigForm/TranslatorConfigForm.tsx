import {
  selectTranslatorConfig,
  useTranslatorStore,
  type TranslatorConfig,
  type TranslatorConfigForm as TranslatorConfigFormType,
} from "@/entities/translator";
import type { BaseProps } from "@/shared/model/component";
import { DynamicForm } from "@/shared/ui/DynamicForm";

interface TranslatorConfigFormProps extends BaseProps {
  formId?: string;
  translator: string;
  configForm: TranslatorConfigFormType;
  onSubmit?: (config: TranslatorConfig) => void;
}

export const TranslatorConfigForm = (props: TranslatorConfigFormProps) => {
  const {
    formId,
    translator,
    configForm,
    onSubmit,
    "data-testid": dataTestId = "TranslatorConfigForm",
  } = props;
  const storeConfig = useTranslatorStore(selectTranslatorConfig(translator));
  const initialValues = { ...configForm.default, ...storeConfig };

  return (
    <DynamicForm
      formId={formId}
      fields={configForm.fields}
      schema={configForm.schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      data-testid={dataTestId}
    />
  );
};
