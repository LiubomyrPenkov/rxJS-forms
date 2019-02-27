import { ReplaySubject, fromEvent } from 'rxjs';
import { debounceTime, map, merge } from 'rxjs/operators'


const subject1 = new ReplaySubject(2);
const subject2 = new ReplaySubject(2);
const subject3 = new ReplaySubject(2);
const subject4 = new ReplaySubject(2);
const subjects = subject1
    .pipe(
        merge(subject2, subject3, subject4)
        );

const input1 = document.querySelector('input.first');
const input2 = document.querySelector('input.second');
const input3 = document.querySelector('input.third');
const input4 = document.querySelector('input.fourth');



const observable1 = fromEvent(input1, 'keyup')
                        .pipe(
                            debounceTime(500),
                            map((e)=>e.target.value),
                            map((v)=>{
                                if (v.length <= 5) {
                                    input1.classList.add('invalid');
                                    subject1.next(`first: ${v}`);
                                } else {
                                    input1.classList.remove('invalid');
                                }
                            })
                        );

const observable2 = fromEvent(input2, 'keyup')
                        .pipe(
                            debounceTime(500),
                            map((e) => e.target.value),
                            map((v) => {
                                if (v <= 50) {
                                    input2.classList.add('invalid');
                                    subject2.next(`second: ${v}`);
                                } else {
                                    input2.classList.remove('invalid');
                                }
                            })
                        );

const observable3 = fromEvent(input3, 'keyup')
                        .pipe(
                            debounceTime(500),
                            map((e) => e.target.value),
                            map((v)=>{
                                if (v.includes('$')) {
                                    input3.classList.remove('invalid');
                                } else {
                                    input3.classList.add('invalid');
                                    subject3.next(`third: ${v}`);
                                }
                            })
                        );

const observable4 = fromEvent(input4, 'keyup')
                        .pipe(
                            debounceTime(500),
                            map((e) => e.target.value),
                            map((v)=>{
                                if (v.length >= 7) {
                                    input4.classList.add('invalid');
                                    subject4.next(`fourth: ${v}`);
                                } else {
                                    input4.classList.remove('invalid');
                                }
                            })
                        );

observable1
    .pipe(
        merge(observable2, observable3, observable4)
        )
    .subscribe(()=>{})

fromEvent(document.querySelector('button'), 'click')
    .subscribe(()=>{
        const subscription = subjects.subscribe((v)=>console.log(v));
        subscription.unsubscribe();
    });