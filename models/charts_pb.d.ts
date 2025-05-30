import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class ChartPoint extends jspb.Message {
  getTimestamp(): string;
  setTimestamp(value: string): ChartPoint;

  getValuesList(): Array<number>;
  setValuesList(value: Array<number>): ChartPoint;
  clearValuesList(): ChartPoint;
  addValues(value: number, index?: number): ChartPoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChartPoint.AsObject;
  static toObject(includeInstance: boolean, msg: ChartPoint): ChartPoint.AsObject;
  static serializeBinaryToWriter(message: ChartPoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChartPoint;
  static deserializeBinaryFromReader(message: ChartPoint, reader: jspb.BinaryReader): ChartPoint;
}

export namespace ChartPoint {
  export type AsObject = {
    timestamp: string,
    valuesList: Array<number>,
  }
}

export class ChartData extends jspb.Message {
  getChartid(): string;
  setChartid(value: string): ChartData;

  getPointsList(): Array<ChartPoint>;
  setPointsList(value: Array<ChartPoint>): ChartData;
  clearPointsList(): ChartData;
  addPoints(value?: ChartPoint, index?: number): ChartPoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChartData.AsObject;
  static toObject(includeInstance: boolean, msg: ChartData): ChartData.AsObject;
  static serializeBinaryToWriter(message: ChartData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChartData;
  static deserializeBinaryFromReader(message: ChartData, reader: jspb.BinaryReader): ChartData;
}

export namespace ChartData {
  export type AsObject = {
    chartid: string,
    pointsList: Array<ChartPoint.AsObject>,
  }
}

export class ChartDataList extends jspb.Message {
  getItemsList(): Array<ChartData>;
  setItemsList(value: Array<ChartData>): ChartDataList;
  clearItemsList(): ChartDataList;
  addItems(value?: ChartData, index?: number): ChartData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChartDataList.AsObject;
  static toObject(includeInstance: boolean, msg: ChartDataList): ChartDataList.AsObject;
  static serializeBinaryToWriter(message: ChartDataList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChartDataList;
  static deserializeBinaryFromReader(message: ChartDataList, reader: jspb.BinaryReader): ChartDataList;
}

export namespace ChartDataList {
  export type AsObject = {
    itemsList: Array<ChartData.AsObject>,
  }
}

