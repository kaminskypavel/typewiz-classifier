export const example1 = `export interface Example1 {}`;

export const example2 = `export interface Example2 {
        requestId: number;
        orderedDependencies?: string[];
        dependencyUrls?: { [id: string]: string };
        javaScript?: string;
        paramValues: any[]
    }`;

export const example3 = `interface Example3 {
        allowSort?: boolean;
        fieldName: string;
        fieldType?: Field.FieldTypeEnum;
        indexAnalyzer?: string;
        searchAnalyzer?: string;
        similarity?: Field.SimilarityEnum;
    }`;

export const example4 = `export interface Example4 {
    /**
     * Minimum zoom level at which clusters are generated.
     */
    minZoom?: number;
    /**
     * Maximum zoom level at which clusters are generated.
     */
    maxZoom?: number;
    /**
     * Cluster radius, in pixels.
     */
    radius?: number;
    /**
     * (Tiles) Tile extent. Radius is calculated relative to this value.
     */
    extent?: number;
    /**
     * Size of the KD-tree leaf node. Affects performance.
     */
    nodeSize?: number;
    /**
     * Whether timing info should be logged.
     */
    log?: boolean;
    /**
     * a reduce function for calculating custom cluster properties
     *
     * @example
     * function (accumulated, props) { accumulated.sum += props.sum; }
     */
    reduce?: (accumulated: any, props: any) => void;
    /**
     * initial properties of a cluster (before running the reducer)
     *
     * @example
     * function () { return {sum: 0}; }
     */
    initial?: () => any;
    /**
     * properties to use for individual points when running the reducer
     *
     * @example
     * function (props) { return {sum: props.my_value}; }
     */
    map?: (props: any) => any;
}`;
