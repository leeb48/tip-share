package com.projects.tipshare.validator;

import com.projects.tipshare.controller.dto.PlacesSearchQueryDto;
import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SearchPlacesValidator implements ConstraintValidator<SearchPlacesQueryConstraint, Object> {


    @Override
    public void initialize(SearchPlacesQueryConstraint constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext constraintValidatorContext) {

        PlacesSearchQueryDto queryDto = (PlacesSearchQueryDto) obj;

        String placeName = queryDto.getPlaceName();
        String placeAddr = queryDto.getPlaceAddr();

        return StringUtils.hasText(placeName) | StringUtils.hasText(placeAddr);
    }
}
