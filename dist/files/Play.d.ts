import { Group } from "./Pt";
import { ITempoListener, ITempoResponses } from "./Types";
import { ISoundAnalyzer, SoundType, PtLike } from "./Types";
export declare class Tempo {
    protected _bpm: number;
    protected _ms: number;
    protected _listeners: {
        [key: string]: ITempoListener;
    };
    protected _listenerInc: number;
    constructor(bpm: number);
    static fromBeat(ms: number): Tempo;
    bpm: number;
    ms: number;
    protected _createID(listener: ITempoListener | Function): string;
    every(beats: number | number[]): ITempoResponses;
    track(time: any): void;
    stop(name: string): void;
    protected animate(time: any, ftime: any): void;
}
export declare class Sound {
    private _type;
    ctx: AudioContext;
    node: AudioNode;
    stream: MediaStream;
    source: HTMLMediaElement;
    buffer: AudioBuffer;
    analyzer: ISoundAnalyzer;
    protected _playing: boolean;
    protected _timestamp: number;
    constructor(type: SoundType);
    static from(node: AudioNode, ctx: AudioContext, type?: SoundType, stream?: MediaStream): Sound;
    static load(source: HTMLMediaElement | string, crossOrigin?: string): Promise<Sound>;
    static loadAsBuffer(url: string): Promise<Sound>;
    protected createBuffer(buf: AudioBuffer): this;
    static generate(type: OscillatorType, val: number | PeriodicWave): Sound;
    protected _gen(type: OscillatorType, val: number | PeriodicWave): Sound;
    static input(constraint?: MediaStreamConstraints): Promise<Sound>;
    readonly type: SoundType;
    readonly playing: boolean;
    readonly progress: number;
    readonly playable: boolean;
    readonly binSize: number;
    readonly sampleRate: number;
    frequency: number;
    connect(node: AudioNode): this;
    analyze(size?: number, minDb?: number, maxDb?: number, smooth?: number): this;
    protected _domain(time: boolean): Uint8Array;
    protected _domainTo(time: boolean, size: PtLike, position?: PtLike, trim?: number[]): Group;
    timeDomain(): Uint8Array;
    timeDomainTo(size: PtLike, position?: PtLike, trim?: number[]): Group;
    freqDomain(): Uint8Array;
    freqDomainTo(size: PtLike, position?: PtLike, trim?: number[]): Group;
    reset(): this;
    start(timeAt?: number): this;
    stop(): this;
    toggle(): this;
}
