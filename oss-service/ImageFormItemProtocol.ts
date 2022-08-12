import { MetadataBuildProtocol, OSSResourceModel } from '@fangcha/oss-service/lib/common/models'

export interface PhotoFormItemProtocol {
  buildMetadata: MetadataBuildProtocol
  onUploadSuccess: (resource: OSSResourceModel) => Promise<void>
}
