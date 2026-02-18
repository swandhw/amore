import type { HomeDomainMenu } from '../types/HomeTypes';
type HomeDomainMenuSectionProps = {
    domains: HomeDomainMenu[];
    activeDomainId: string | null;
    isLoading: boolean;
    onDomainSelect: (domainId: string) => void;
};
declare function HomeDomainMenuSection({ domains, activeDomainId, isLoading, onDomainSelect, }: HomeDomainMenuSectionProps): import("react/jsx-runtime").JSX.Element;
export default HomeDomainMenuSection;
