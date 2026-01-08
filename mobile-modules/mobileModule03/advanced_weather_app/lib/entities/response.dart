enum ErrorStatus { permissionDenied, cityNotFound, connectionFailed }

class ResponseModel<T> {
  final ErrorStatus? error;
  final T? data;

  ResponseModel({this.data, this.error});
}
