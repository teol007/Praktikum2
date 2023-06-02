interface EmailHeaders {
  [key: string]: string;
}

export interface UrlAttachments {
  filename: string;
  path: string;
}

export interface EmailMessage {
  subject: string;
  html: string;
  attachments?: UrlAttachments[];
}

export interface Email {
  to: string | string[];
  message: EmailMessage;
  headers?: EmailHeaders;
}