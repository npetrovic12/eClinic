import { PipeTransform, Pipe } from '@angular/core';
import { isForOfStatement } from 'typescript';

@Pipe({
  name: 'pathResolve'
})
export class PathResolvePipe implements PipeTransform {
  transform(object: any, customFunction, ...args) {
    if (!object) {
      return '';
    }

    if (customFunction) {
      return customFunction(object, ...args);
    }

    return this.resolvePath(object, customFunction);
  }

  resolvePath(object, fieldPaths) {
    let resultValue = '';

    if (!fieldPaths || !fieldPaths.length || (fieldPaths.length === 1 && fieldPaths[0] === '')) {
      return object;
    }

    fieldPaths.forEach((fieldPath, index) => {
      if (fieldPath.includes('[')) {
        throw Error('Invalid path format, should be word.word.word');
      }

      let splittedPath = fieldPath.split('.');
      let currentValue = object;
      for (let pathFragment in splittedPath) {
        if (!currentValue[pathFragment]) {
          currentValue = '';
          break;
        }
        currentValue = currentValue[pathFragment];
      }
      if (typeof currentValue === 'string') {
        resultValue += index !== fieldPaths.length - 1 ? currentValue + ' ' : currentValue;
      } else {
        resultValue = currentValue;
      }
    });
    return resultValue || '';
  }
}
