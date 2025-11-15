/**
 * TypeScript type definitions for RabbitMQ API responses
 */

export interface MessageStats {
  publish?: number;
  publish_details?: {
    rate: number;
  };
  publish_in?: number;
  publish_in_details?: {
    rate: number;
  };
  publish_out?: number;
  publish_out_details?: {
    rate: number;
  };
  deliver_get?: number;
  deliver_get_details?: {
    rate: number;
  };
  ack?: number;
  ack_details?: {
    rate: number;
  };
  deliver?: number;
  deliver_details?: {
    rate: number;
  };
  deliver_no_ack?: number;
  deliver_no_ack_details?: {
    rate: number;
  };
  get?: number;
  get_details?: {
    rate: number;
  };
  get_no_ack?: number;
  get_no_ack_details?: {
    rate: number;
  };
  redeliver?: number;
  redeliver_details?: {
    rate: number;
  };
}

export interface QueueTotals {
  messages?: number;
  messages_ready?: number;
  messages_unacknowledged?: number;
}

export interface ObjectTotals {
  consumers?: number;
  queues?: number;
  exchanges?: number;
  connections?: number;
  channels?: number;
}

export interface OverviewData {
  cluster_name: string;
  message_stats?: MessageStats;
  queue_totals?: QueueTotals;
  object_totals?: ObjectTotals;
}

export interface Exchange {
  name: string;
  type: string;
  durable: boolean;
  message_stats: MessageStats;
}

export interface Queue {
  name: string;
  node: string;
  state: string;
  messages?: number;
  messages_details?: {
    rate: number;
  };
  messages_persistent?: number;
  backing_queue_status?: Record<string, unknown>;
  message_stats?: MessageStats;
}

export interface Producer {
  name: string;
  state: string;
  message_stats: MessageStats;
}

export interface Consumer {
  name: string;
  state: string;
  queue?: string;
  message_stats: MessageStats;
}

export interface Binding {
  exchange_name: string;
  queue_name: string;
}

export interface CarrotData {
  cluster_name: string;
  queue_totals?: QueueTotals;
  object_totals?: ObjectTotals;
  message_stats?: MessageStats;
  exchanges: Exchange[];
  queues: Queue[];
  producers: Producer[];
  consumers: Consumer[];
  bindings: Binding[];
}

export interface D3Node {
  identifier: string;
  group: number;
  name: string;
  visibility?: boolean;
  message_stats?: MessageStats;
  type?: string;
  state?: string;
  queue?: string;
}

export interface D3Link {
  source: string;
  target: string;
  rate: number;
}

export interface D3Title {
  name: string;
  x: number;
  y: number;
}

export interface D3Data {
  cluster_name: string;
  nodes: D3Node[];
  links: D3Link[];
  identifiers: Array<{ binding: string; exchange: string }>;
  producers: number;
  exchanges: number;
  queues: number;
  consumers: number;
  width: number;
  height: number;
  titles?: D3Title[];
  message_stats?: MessageStats;
}

export interface UserConfig {
  host: string;
  username: string;
  password: string;
  port: string;
  isWeb: boolean;
}
